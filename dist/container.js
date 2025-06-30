const states = {};
const subscribers = {};
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
export { states, subscribers, subscribe };
