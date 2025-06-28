import { useState, useEffect } from 'react';
import { isNonEmptyString } from './utils';
// Containers
const states = {};
const subscribers = {};
// Listeners
window.addEventListener('message', (event) => {
    var _a, _b;
    const name = (_a = event.data.frameState) === null || _a === void 0 ? void 0 : _a.name;
    const value = (_b = event.data.frameState) === null || _b === void 0 ? void 0 : _b.value;
    if (!isNonEmptyString(name) || states[name] === value) {
        return;
    }
    states[name] = value;
    for (const callback of subscribers[name]) {
        callback(states[name]);
    }
});
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
function getFrameState(name) {
    var _a;
    const iframes = document.querySelectorAll('iframe');
    const data = { getFrameState: { name } };
    for (const iframe of iframes) {
        (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(data, '*');
    }
}
// Hooks
/**
 * @param initialValue - The value used until synchronization occurs.
 */
function useFrameState(name, initialValue) {
    const [value, setValue] = useState(() => {
        return states.hasOwnProperty(name) ? states[name] : initialValue;
    });
    useEffect(() => {
        if (!isNonEmptyString(name)) {
            return;
        }
        const unsubscribe = subscribe(name, (newValue) => {
            setValue(newValue);
        });
        getFrameState(name);
        return () => {
            unsubscribe();
        };
    }, [name]);
    // TODO: Add isMounted check
    return value;
}
// Exports
export default useFrameState;
