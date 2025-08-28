export { }

type Callback = (...args: any[]) => any;
type Subscription = {
    unsubscribe: () => void
}

class EventEmitter {

    private events: Record<string, Callback[]>

    constructor() {
        this.events = Object.create(null);
    }

    subscribe(eventName: string, callback: Callback): Subscription {

        if (eventName in this.events) {
            this.events[eventName].push(callback)
        } else {
            this.events[eventName] = [callback]

        }

        return {
            unsubscribe: () => {
                const callbackArr = this.events[eventName]
                if (callbackArr.length !== 0) {
                    const index = callbackArr.indexOf(callback)
                    if (index !== -1) {
                        callbackArr.splice(index, 1)
                    }
                }
            }
        };
    }

    emit(eventName: string, args: any[] = []): any[] {
        if (!this.events[eventName]) return [];
        const resultArr: Array<any> = [];
        for (const event of this.events[eventName]) {
            resultArr.push(event(...args))
        }
        return resultArr;
    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */


