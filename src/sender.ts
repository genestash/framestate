// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<{ name: string }>) => {
    // Todo: validate source
    const name = event.data.name;
    if (!states.hasOwn(name)) return;
    emitFrameState(name);
});

// Functions

function setFrameState(name: string, value: any) {
    if (states[name] === value) return;
    states[name] = value;
    emitFrameState(name);
}

function emitFrameState(name: string) {
    // Todo: secure origin
    window.parent.postMessage({ name, value: states[name] }, '*');
}

// Exports

export default setFrameState;
