### Component

`memo()` <!-- .element: class="hljs language-ts" -->

**Usage** - Cache an entire component.

```tsx
import type { User } from '@redteam/user';
import { memo } from 'react';

const UserInfo = memo(({
  firstName, 
  lastName,
  email 
}: User) => (
  <div className="container">
    <div>First name: {firstName}</div>
    <div>Last name: {lastName}</div>
    <div>Email: {email}</div>
  </div>
));
```