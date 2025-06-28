import type { RequestData, ResponseData } from './types';

// Containers

const states: Record<string, unknown> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<RequestData>) => {
    if (!event.data.getFrameState) return;
    const name = event.data.getFrameState.name;
    emitFrameState(name);
});

// Functions

function emitFrameState(name: string) {
    if (!states.hasOwnProperty(name)) return;

    const data: ResponseData = {
        frameState: {
            name: name,
            value: states[name]
        }
    };

    // TODO: secure origin
    window.parent.postMessage(data, '*');
}

function setFrameState(name: string, value: unknown) {
    if (states[name] === value) return;
    states[name] = value;
    emitFrameState(name);
}

// Exports

export default setFrameState;
