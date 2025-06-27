// Imports

// Containers

const states: Record<string, any> = {};
const listeners: Record<string, Set<VoidFunction>> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<{ name: string; value: any }>) => {
    // Todo: validate source
    const name = event.data.name;
    const value = event.data.value;
    if (states[name] === value) return;
    states[name] = value;
    // Todo: notify subscribers
});

// Functions

function subscribe(name: string, callback: VoidFunction) {}

// Hooks

function useFrameState(name: string, initialValue: any) {}

// Exports

export default useFrameState;
