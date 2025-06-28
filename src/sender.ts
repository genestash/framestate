import type { Request, Response } from './types';

// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<Request>) => {
    emitFrameState(event.data.getFrameState?.name);
});

// Functions

function emitFrameState(name: string) {
    if (!name || !states.hasOwnProperty(name)) return;

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
    if (!name || states[name] === value) return;
    states[name] = value;
    emitFrameState(name);
}

// Exports

export default setFrameState;
