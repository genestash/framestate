import { EmitDirection } from './types';
function emitFrameState(name, value, direction) {
    var _a;
    const data = {
        name,
        value,
        direction,
        isFrameState: true
    };
    if (direction == EmitDirection.Up || direction == EmitDirection.Both) {
        window.parent.postMessage(Object.assign(Object.assign({}, data), { direction: EmitDirection.Up }), '*');
    }
    if (direction == EmitDirection.Down || direction == EmitDirection.Both) {
        const iframes = document.querySelectorAll('iframe');
        for (const iframe of iframes) {
            (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(Object.assign(Object.assign({}, data), { direction: EmitDirection.Down }), '*');
        }
    }
}
export { emitFrameState };
