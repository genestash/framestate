const states = {};
window.addEventListener('message', (event) => {
    var _a;
    const name = (_a = event.data.getFrameState) === null || _a === void 0 ? void 0 : _a.name;
    if (!name || !states.hasOwnProperty(name))
        return;
    emitFrameState(name);
});
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
    if (!name || states[name] === value)
        return;
    states[name] = value;
    emitFrameState(name);
}
export default setFrameState;
