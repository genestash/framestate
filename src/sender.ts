function setFrameState(name: string, value: any) {
	// Todo: secure origin
	window.parent.postMessage({ name, value }, '*');
}
