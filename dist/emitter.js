function emitFrameState(name, value, source) {
    var _a;
    const data = {
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
        (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(data, '*');
    }
}
export { emitFrameState };
