# framestate

A lightweight bridge for state synchronization between iframes and React components in the parent window.

## Installation

```bash
npm install framestate
```

## Usage inside the iframe

Use `setFrameState(name, value)` to update the state.

```ts
import { useState } from 'react';
import { setFrameState } from 'framestate';

function Input() {
  const [text, setText] = useState('');

  const update = (event: React.ChangeEvent<HTMLInputElement>) => {
	setText(event.target.value);
  };

  setFrameState('message', text);

  return <input value={text} onChange={update} />;
}
```

## Usage in the parent window

Use `useFrameState(name)` hook to access the state. The component re-renders when the state changes.

```ts
import { useFrameState } from 'framestate';

function Message() {
  const text = useFrameState<string>('message');
  return <h1>{text}</h1>;
}
```