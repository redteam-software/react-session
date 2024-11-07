```tsx [|3-5|7]
import { FC } from 'react';

interface MessageProps {
  name: string;
}

const Message: FC<MessageProps> = ({ name }) => {
  return <h1>Hello {name}</h1>;
}
```
<!-- .element: data-id="code-animation" -->
