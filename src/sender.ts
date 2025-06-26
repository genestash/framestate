// Containers

const states: Record<string, any> = {};

// Listeners

window.addEventListener('message', (event: MessageEvent) => {
	// Todo: validate source
	emitState(event.data.name);
});

// Functions

function setFrameState(name: string, value: any) {
	states[name] = value;
	emitState(name);
}

function emitState(name: string) {
	// Todo: secure origin
	window.parent.postMessage({ name, value: states[name] }, '*');
}

// Exports

export default setFrameState;
