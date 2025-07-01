import { EmitDirection, StatePayload } from './types';

function emitFrameState(name: string, value: unknown, direction: EmitDirection) {
    const data: StatePayload = {
        name,
        value,
        direction,
        isFrameState: true
    };

    if (direction == EmitDirection.Up || direction == EmitDirection.Both) {
        window.parent.postMessage({ ...data, direction: EmitDirection.Up }, '*');
    }

    if (direction == EmitDirection.Down || direction == EmitDirection.Both) {
        const iframes = document.querySelectorAll('iframe');

        for (const iframe of iframes) {
            iframe.contentWindow?.postMessage({ ...data, direction: EmitDirection.Down }, '*');
        }
    }
}

export { emitFrameState };
