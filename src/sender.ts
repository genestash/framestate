// Types

interface ReceiverData {
    getFrameState: {
        name: string;
    };
}

// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<ReceiverData>) => {
    if (!event.data.getFrameState) return;
    const name = event.data.getFrameState.name;
    emitFrameState(name);
});

// Functions

function emitFrameState(name: string) {
    if (!states.hasOwnProperty(name)) return;

    const data = {
        frameState: {
            name: name,
            value: states[name]
        }
    };

    // TODO: secure origin
    window.parent.postMessage(data, '*');
}

function setFrameState(name: string, value: any) {
    if (states[name] === value) return;
    states[name] = value;
    emitFrameState(name);
}

// Exports

export default setFrameState;
