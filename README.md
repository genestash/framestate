# framestate

A lightweight bridge for state synchronization between iframes and React components in the parent window.

## Installation

```bash
npm install framestate
```

## Usage inside the iframe

```ts
import { setFrameState } from 'framestate';

setFrameState('x', 12);
```

## Usage in the parent window

```ts
import { useFrameState } from 'framestate';

function DisplayValue() {
  const value = useFrameState('x');
  return <h1>{value}</h1>; // 12
}
```