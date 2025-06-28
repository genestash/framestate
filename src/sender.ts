import type { Request, Response } from './types';

// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent<Request>) => {
    const name = event.data.getFrameState?.name;
    if (!name || !states.hasOwnProperty(name)) return;
    emitFrameState(name);
});

// Functions

function emitFrameState(name: string) {
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
