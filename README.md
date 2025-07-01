# framestate

State synchronization between React components and iframes.

## Installation

```bash
npm install framestate
```

## Usage in the page

```ts
import { useFrameState } from 'framestate';

function Input() {
  const [text, setText] = useFrameState('message');

  const update = (event: React.ChangeEvent<HTMLInputElement>) => {
	setText(event.target.value);
  };

  return <input value={text} onChange={update} />;
}
```

## Usage in the iframe

```ts
import { useFrameState } from 'framestate';

function Message() {
  const [text] = useFrameState('message');
  return <p>{text}</p>;
}
```

State synchronization propagates in both directions, allowing you to pass data from the page to the iframe, as well as from the iframe back to the page.