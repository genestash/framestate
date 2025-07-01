import { update } from './manager';
import { StatePayload } from './types';

function runStateListener() {
    const handleMessage = (event: MessageEvent<StatePayload>) => {
        if (window === event.source) {
            return;
        }

        if (!event.data.isFrameState) {
            return;
        }

        update(event.data.name, event.data.value, event.data.direction);
    };

    window.addEventListener('message', handleMessage);
}

export { runStateListener };
