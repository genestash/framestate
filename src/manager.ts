import { emitFrameState } from './emitter';
import { EmitDirection, SubscriberCallback } from './types';

// Containers

const states: Record<string, unknown> = {};
const subscribers: Record<string, Set<SubscriberCallback>> = {};

// Functions

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

function update(name: string, value: unknown, direction: EmitDirection) {
    if (states[name] === value) {
        return;
    }

    states[name] = value;

    // Notify local subscribers

    for (const callback of subscribers[name] || []) {
        callback(states[name]);
    }

    // Emit outside

    emitFrameState(name, value, direction);
}

// Exports

export { states, subscribe, update };
