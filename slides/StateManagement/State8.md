### Component State

```tsx [7|10]
import { useState } from 'react';

const Message = () => {
  const [name, setName] = useState('');
  
  const handleNameClick = () => {
    setName(getRandomName());
  }
  
  return <h1 onClick={handleNameClick}>Hello {name}</h1>;
}
```
<!-- .element: data-id="code-animation" -->