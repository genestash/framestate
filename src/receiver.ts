import { useState, useEffect } from 'react';
import { isNonEmptyString } from './utils';
import type { Request, Response, SubscriberCallback } from './types';

// Containers

const states: Record<string, any> = {};
const subscribers: Record<string, Set<SubscriberCallback>> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<Response>) => {
    const name = event.data.frameState?.name;
    const value = event.data.frameState?.value;

    if (!isNonEmptyString(name) || states[name] === value) {
        return;
    }

    states[name] = value;

    for (const callback of subscribers[name]) {
        callback(states[name]);
    }
});

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

function getFrameState(name: string) {
    const iframes = document.querySelectorAll('iframe');
    const data: Request = { getFrameState: { name } };

    for (const iframe of iframes) {
        iframe.contentWindow?.postMessage(data, '*');
    }
}

// Hooks

/**
 * @param initialValue - The value used until synchronization occurs.
 */
function useFrameState<T = unknown>(name: string, initialValue?: T): T {
    const [value, setValue] = useState<T>(() => {
        return states.hasOwnProperty(name) ? states[name] : initialValue;
    });

    useEffect(() => {
        if (!isNonEmptyString(name)) {
            return;
        }

        const unsubscribe = subscribe(name, (newValue) => {
            setValue(newValue);
        });

        getFrameState(name);

        return () => {
            unsubscribe();
        };
    }, [name]);

    // TODO: Add isMounted check

    return value;
}

// Exports

export default useFrameState;
