```tsx [8]
import { FC } from 'react';

interface MessageProps {
  name: string;
  onClick: (name: string) => void;
}

const Message: FC<MessageProps> = ({ name, onClick }) => {
  const handleNameClick = () => {
    alert(`Hello ${name}`);
  }
  
  return (
    <h1 onClick={handleNameClick}>Hello {name}</h1>
  );
}
```
<!-- .element: data-id="code-animation" -->
