class EventEmitter {
    private events: {}

    constructor() {
        this.events = {}
    }

    on(eventName: string, listener: (...args: any[]) => void) {
        if (eventName in this.events) {
            this.events[eventName].push(listener);
        } else {
            this.events[eventName] = [listener];
        }
    }

    once(eventName: string, listener: (...args: any[]) => void) {
        const onceListener = (...args: any[]) => {
            listener(...args);
            this.off(eventName, onceListener);
        }
        this.on(eventName, onceListener);
    }

    off(eventName: string, listener: (...args: any[]) => void) {
        if (eventName in this.events) {
            this.events[eventName] = this.events[eventName].filter(l => l !== listener);
        }
    }

    emit(eventName: string, ...args: any[]) {
        if (eventName in this.events) {
            this.events[eventName].forEach(listener => listener(...args));
        }
    }

    destroy() {
        this.events = {};
    }
}