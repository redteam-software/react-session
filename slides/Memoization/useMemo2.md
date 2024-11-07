### Hooks

`useMemo()` <!-- .element: data-highlighted="yes" class="hljs language-ts" data-id="useMemo" -->

**Usage** - Memoize (cache) a value in a component. Only recalculates when its dependencies change.

```ts
const fullName = useMemo(
  () => firstName + ' ' + lastName, 
  [firstName, lastName]
);
```
