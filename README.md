# framestate

A lightweight bridge for state synchronization between iframes and React components in the parent window.

## Installation

```bash
npm install framestate
```

## Usage in the iframe

Example:

```ts
import { setFrameState } from 'framestate';

function DisplayValue() {
  const [value, setValue] = useState('');

  const update = (event) => {
	setValue(event.target.value);
  };

  setFrameState('counter', value);

  return (
	<>
		<input value={value} onChange={() => setValue(event.target.value)} />
	</>
  );
}
```

## Usage in the parent window

Example:

```ts
import { useFrameState } from 'framestate';

function Message() {
  const value = useFrameState('message');
  return <h1>{value}</h1>;
}
```