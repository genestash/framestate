import type { Request, Response } from './types';

// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<Request>) => {
    if (!event.data.getFrameState) return;
    const name = event.data.getFrameState.name;
    emitFrameState(name);
});

// Functions

function emitFrameState(name: string) {
    if (!states.hasOwnProperty(name)) return;

    const data: Response = {
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
