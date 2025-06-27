// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent) => {
    if (!event.data.isFrameState) return;
    const name: string = event.data.name;
    if (!states.hasOwnProperty(name)) return;
    emitState(name);
});

// Functions

function setFrameState(name: string, value: any) {
    if (!Object.is(states[name], value)) return;
    states[name] = value;
    emitState(name);
}

function emitState(name: string) {
    const data = {
        name: name,
        value: states[name],
        isFrameState: true,
    };

    // Todo: secure origin
    window.parent.postMessage(data, '*');
}

// Exports

export default setFrameState;
