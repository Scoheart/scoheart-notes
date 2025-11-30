# socks5

## code

``` js
// Pure SOCKS5 Server - RFC 1928 Compliant
import net from 'net';
import Logger from './logger.js';

class Socks5Server {
    constructor(config = {}) {
        this.config = {
            localPort: config.localPort || 1080,
            localAddr: config.localAddr || '127.0.0.1',
            timeout: config.timeout || 30000,
            logLevel: config.logLevel || 'info'
        };
        this.logger = new Logger(this.config);
        this.server = null;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.server = net.createServer(this.handleConnection.bind(this));
            
            this.server.listen(this.config.localPort, this.config.localAddr, () => {
                this.logger.info(`SOCKS5 server listening on ${this.config.localAddr}:${this.config.localPort}`);
                resolve();
            });

            this.server.on('error', reject);
        });
    }

    stop() {
        if (this.server) {
            this.server.close();
            this.logger.info('SOCKS5 server stopped');
        }
    }

    async handleConnection(clientSocket) {
        try {
            clientSocket.setTimeout(this.config.timeout);
            
            // RFC 1928 - Method Selection
            const methods = await this.negotiateMethod(clientSocket);
            
            // RFC 1928 - Request Processing
            const request = await this.parseRequest(clientSocket);
            
            // Handle CONNECT command only (RFC 1928)
            if (request.cmd === 0x01) {
                await this.handleConnect(clientSocket, request);
            } else {
                // Command not supported
                this.sendReply(clientSocket, 0x07);
                clientSocket.end();
            }
        } catch (error) {
            this.logger.debug(`Connection error: ${error.message}`);
            clientSocket.destroy();
        }
    }

    // RFC 1928 - Method Selection
    negotiateMethod(socket) {
        return new Promise((resolve, reject) => {
            socket.once('data', (data) => {
                try {
                    // Check minimum packet size
                    if (data.length < 3) {
                        socket.write(Buffer.from([0x05, 0xFF]));
                        return reject(new Error('Invalid method selection packet'));
                    }

                    const version = data[0];
                    const nmethods = data[1];
                    
                    // Check SOCKS version
                    if (version !== 0x05) {
                        socket.write(Buffer.from([0x05, 0xFF]));
                        return reject(new Error('Unsupported SOCKS version'));
                    }

                    // Check packet completeness
                    if (data.length !== 2 + nmethods) {
                        socket.write(Buffer.from([0x05, 0xFF]));
                        return reject(new Error('Incomplete method selection packet'));
                    }

                    const methods = Array.from(data.slice(2, 2 + nmethods));

                    // Only support "No Authentication" (0x00)
                    if (methods.includes(0x00)) {
                        socket.write(Buffer.from([0x05, 0x00]));
                        resolve(methods);
                    } else {
                        socket.write(Buffer.from([0x05, 0xFF]));
                        reject(new Error('No acceptable authentication method'));
                    }
                } catch (err) {
                    socket.write(Buffer.from([0x05, 0xFF]));
                    reject(err);
                }
            });

            socket.on('error', reject);
            socket.on('close', () => reject(new Error('Connection closed during negotiation')));
        });
    }

    // RFC 1928 - Request Parsing
    parseRequest(socket) {
        return new Promise((resolve, reject) => {
            socket.once('data', (data) => {
                try {
                    // Minimum request size check
                    if (data.length < 7) {
                        this.sendReply(socket, 0x07);
                        return reject(new Error('Request packet too short'));
                    }

                    const version = data[0];
                    const cmd = data[1];
                    const rsv = data[2];
                    const atyp = data[3];

                    // Validate request format
                    if (version !== 0x05 || rsv !== 0x00) {
                        this.sendReply(socket, 0x07);
                        return reject(new Error('Invalid request format'));
                    }

                    let addr, port, expectedLength;

                    // Parse address based on type
                    switch (atyp) {
                        case 0x01: // IPv4
                            expectedLength = 10; // 4 + 4 + 2
                            if (data.length < expectedLength) {
                                this.sendReply(socket, 0x07);
                                return reject(new Error('Incomplete IPv4 request'));
                            }
                            addr = Array.from(data.slice(4, 8)).join('.');
                            port = data.readUInt16BE(8);
                            break;

                        case 0x03: // Domain name
                            const domainLength = data[4];
                            expectedLength = 7 + domainLength; // 4 + 1 + domain + 2
                            if (data.length < expectedLength) {
                                this.sendReply(socket, 0x07);
                                return reject(new Error('Incomplete domain request'));
                            }
                            addr = data.slice(5, 5 + domainLength).toString('utf8');
                            port = data.readUInt16BE(5 + domainLength);
                            break;

                        case 0x04: // IPv6
                            expectedLength = 22; // 4 + 16 + 2
                            if (data.length < expectedLength) {
                                this.sendReply(socket, 0x07);
                                return reject(new Error('Incomplete IPv6 request'));
                            }
                            const ipv6Parts = [];
                            for (let i = 4; i < 20; i += 2) {
                                ipv6Parts.push(data.readUInt16BE(i).toString(16));
                            }
                            addr = ipv6Parts.join(':');
                            port = data.readUInt16BE(20);
                            break;

                        default:
                            this.sendReply(socket, 0x08);
                            return reject(new Error('Unsupported address type'));
                    }

                    // Validate port
                    if (port === 0) {
                        this.sendReply(socket, 0x07);
                        return reject(new Error('Invalid port'));
                    }

                    resolve({ cmd, atyp, addr, port });
                } catch (err) {
                    this.sendReply(socket, 0x01);
                    reject(err);
                }
            });

            socket.on('error', reject);
            socket.on('close', () => reject(new Error('Connection closed during request parsing')));
        });
    }

    // RFC 1928 - Reply Format
    sendReply(socket, rep, bndAddr = '0.0.0.0', bndPort = 0) {
        try {
            const reply = Buffer.alloc(10);
            reply[0] = 0x05;  // VER
            reply[1] = rep;   // REP
            reply[2] = 0x00;  // RSV
            reply[3] = 0x01;  // ATYP (IPv4)
            
            // BND.ADDR (IPv4 format)
            const addrParts = bndAddr.split('.');
            if (addrParts.length === 4) {
                reply[4] = parseInt(addrParts[0]);
                reply[5] = parseInt(addrParts[1]);
                reply[6] = parseInt(addrParts[2]);
                reply[7] = parseInt(addrParts[3]);
            }
            
            // BND.PORT
            reply.writeUInt16BE(bndPort, 8);
            
            socket.write(reply);
        } catch (err) {
            this.logger.debug(`Failed to send reply: ${err.message}`);
        }
    }

    // Handle CONNECT command
    async handleConnect(clientSocket, request) {
        const { addr, port } = request;
        
        this.logger.debug(`CONNECT ${addr}:${port}`);

        try {
            // Create connection to target
            const targetSocket = await this.createTargetConnection(addr, port);
            
            // Send success reply
            this.sendReply(clientSocket, 0x00);
            
            // Start data relay
            this.relayData(clientSocket, targetSocket);
            
        } catch (error) {
            this.logger.debug(`Connection failed: ${error.message}`);
            
            // Send appropriate error reply
            let errorCode = 0x01; // General SOCKS server failure
            if (error.code === 'ENOTFOUND') {
                errorCode = 0x04; // Host unreachable
            } else if (error.code === 'ECONNREFUSED') {
                errorCode = 0x05; // Connection refused
            } else if (error.code === 'ETIMEDOUT') {
                errorCode = 0x06; // TTL expired
            }
            
            this.sendReply(clientSocket, errorCode);
            clientSocket.end();
        }
    }

    // Create connection to target server
    createTargetConnection(host, port) {
        return new Promise((resolve, reject) => {
            const targetSocket = net.createConnection({
                host,
                port,
                timeout: this.config.timeout
            });

            targetSocket.on('connect', () => {
                targetSocket.setTimeout(0); // Remove timeout after connection
                resolve(targetSocket);
            });

            targetSocket.on('error', reject);
            targetSocket.on('timeout', () => {
                targetSocket.destroy();
                reject(new Error('Connection timeout'));
            });
        });
    }

    // Simple data relay between client and target
    relayData(clientSocket, targetSocket) {
        // Relay data from client to target
        clientSocket.on('data', (data) => {
            if (!targetSocket.destroyed) {
                targetSocket.write(data);
            }
        });

        // Relay data from target to client
        targetSocket.on('data', (data) => {
            if (!clientSocket.destroyed) {
                clientSocket.write(data);
            }
        });

        // Handle connection closures
        clientSocket.on('close', () => {
            if (!targetSocket.destroyed) {
                targetSocket.end();
            }
        });

        targetSocket.on('close', () => {
            if (!clientSocket.destroyed) {
                clientSocket.end();
            }
        });

        // Handle errors
        clientSocket.on('error', () => {
            if (!targetSocket.destroyed) {
                targetSocket.destroy();
            }
        });

        targetSocket.on('error', () => {
            if (!clientSocket.destroyed) {
                clientSocket.destroy();
            }
        });
    }
}

// Create and start server
const server = new Socks5Server({
    localPort: 1080,
    localAddr: '127.0.0.1',
    timeout: 30000,
    logLevel: 'debug'
});

// Start server
server.start().catch(err => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down SOCKS5 server...');
    server.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    server.stop();
    process.exit(0);
});

export default server;
```