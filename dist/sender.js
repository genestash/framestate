import { isNonEmptyString } from './utils';
// Containers
const states = {};
// Listeners
window.addEventListener('message', (event) => {
    var _a;
    const name = (_a = event.data.getFrameState) === null || _a === void 0 ? void 0 : _a.name;
    if (!isNonEmptyString(name) || !states.hasOwnProperty(name)) {
        return;
    }
    emitFrameState(name);
});
// Functions
function emitFrameState(name) {
    const data = {
        frameState: {
            name: name,
            value: states[name]
        }
    };
    window.parent.postMessage(data, '*');
}
function setFrameState(name, value) {
    if (!isNonEmptyString(name) || states[name] === value) {
        return;
    }
    states[name] = value;
    emitFrameState(name);
}
// Exports
export default setFrameState;
