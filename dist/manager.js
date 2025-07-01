import { emitFrameState } from './emitter';
// Containers
const states = {};
const subscribers = {};
// Functions
/**
 * @returns An unsubscribe function.
 */
function subscribe(name, callback) {
    if (!subscribers[name]) {
        subscribers[name] = new Set();
    }
    subscribers[name].add(callback);
    return () => {
        subscribers[name].delete(callback);
        if (!subscribers[name].size) {
            delete subscribers[name];
        }
    };
}
function update(name, value, direction) {
    if (states[name] === value) {
        return;
    }
    states[name] = value;
    // Notify local subscribers
    for (const callback of subscribers[name] || []) {
        callback(states[name]);
    }
    // Emit outside
    emitFrameState(name, value, direction);
}
// Exports
export { states, subscribe, update };
