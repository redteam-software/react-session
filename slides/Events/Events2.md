```tsx [8-10|13|]
import { FC } from 'react';

interface MessageProps {
  name: string;
}

const Message: FC<MessageProps> = ({ name }) => {
  const handleNameClick = () => {
    alert(`Hello ${name}`);
  }
  
  return (
    <h1 onClick={handleNameClick}>Hello {name}</h1>
  );
}
```
<!-- .element: data-id="code-animation" -->
