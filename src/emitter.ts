import type { StatePayload } from './types';

function emitFrameState(name: string, value: unknown, source: number) {
    const data: StatePayload = {
        name,
        value,
        source,
        isFrameState: true
    };

    // Emit upward

    window.parent.postMessage(data, '*');

    // Emit downward

    const iframes = document.querySelectorAll('iframe');

    for (const iframe of iframes) {
        iframe.contentWindow?.postMessage(data, '*');
    }
}

export { emitFrameState };
