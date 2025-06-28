import { useState } from 'react';
const states = {};
const subscribers = {};
window.addEventListener('message', (event) => {
    var _a, _b;
    const name = (_a = event.data.frameState) === null || _a === void 0 ? void 0 : _a.name;
    const value = (_b = event.data.frameState) === null || _b === void 0 ? void 0 : _b.value;
    if (!name || states[name] === value) {
        return;
    }
    states[name] = value;
    for (const callback of subscribers[name]) {
        callback(states[name]);
    }
});
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
    if (!name)
        return;
    const iframes = document.querySelectorAll('iframe');
    const data = { getFrameState: { name } };
    for (const iframe of iframes) {
        (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(data, '*');
    }
}
function useFrameState(name, initialValue) {
    const [value, setValue] = useState(() => {
        return states.hasOwnProperty(name) ? states[name] : initialValue;
    });
    return value;
}
export default useFrameState;
