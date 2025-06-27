// Imports

// Types

type SubscriberCallback = (value: any) => void;

// Containers

const states: Record<string, any> = {};
const subscribers: Record<string, Set<SubscriberCallback>> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<{ name: string; value: any }>) => {
    // Todo: validate source

    const name = event.data.name;
    const value = event.data.value;
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
    };
}

// Hooks

function useFrameState(name: string, initialValue: any) {}

// Exports

export default useFrameState;
