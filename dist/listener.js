import { isNonEmptyString } from './utils';
import { states, subscribers } from './container';
function runStateListener() {
    window.addEventListener('message', (event) => {
        if (!event.data.isFrameState) {
            return;
        }
        const name = event.data.name;
        const value = event.data.value;
        const source = event.data.source;
        if (!isNonEmptyString(name) || states[name] === value) {
            return;
        }
        states[name] = value;
        if (!subscribers[name]) {
            return;
        }
        for (const callback of subscribers[name]) {
            callback(states[name], source);
        }
    });
}
export { runStateListener };
