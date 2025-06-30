import type { SubscriberCallback } from './types';

const states: Record<string, unknown> = {};
const subscribers: Record<string, Set<SubscriberCallback>> = {};

/**
 * @returns An unsubscribe function.
 */
function subscribe(name: string, callback: SubscriberCallback): VoidFunction {
    if (!subscribers[name]) {
        subscribers[name] = new Set();
    }

    subscribers[name].add(callback);

    return () => {
        subscribers[name].delete(callback);

        if (!subscribers[name].size) {
            delete subscribers[name];
        }
    };
}

export { states, subscribers, subscribe };
