### Hooks

`useCallback()` <!-- .element: data-highlighted="yes" class="hljs language-ts" -->

**Usage** - Memoize (cache) a function in a component. Only recreated when dependencies change.

```ts
const handleClick = useCallback(
  async () => callAPI(input), 
  [input]
);
```
