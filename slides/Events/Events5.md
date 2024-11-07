```tsx [10|]
import { FC } from 'react';

interface MessageProps {
  name: string;
  onClick: (name: string) => void;
}

const Message: FC<MessageProps> = ({ name, onClick }) => {
  return (
    <h1 onClick={onClick}>Hello {name}</h1>
  );
}
```
<!-- .element: data-id="code-animation" -->
