import type { RequestData, ResponseData, SubscriberCallback } from './types';

// Containers

const states: Record<string, any> = {};
const subscribers: Record<string, Set<SubscriberCallback>> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<ResponseData>) => {
    if (!event.data.frameState) return;
    const name = event.data.frameState.name;
    const value = event.data.frameState.value;
    if (states[name] === value) return;
    states[name] = value;

    for (const subscriber of subscribers[name]) {
        subscriber(states[name]);
    }
});

// Functions

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
    if (!name) return;

    const iframes = document.querySelectorAll('iframe');
    const data: RequestData = { getFrameState: { name } };

    for (const iframe of iframes) {
        iframe.contentWindow?.postMessage(data, '*');
    }

    // Sending messages to all iframes is a bad solution
    // TODO: add iframe selection logic
}

// Hooks

function useFrameState(name: string) {}

// Exports

export default useFrameState;
