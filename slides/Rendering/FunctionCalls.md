### Function Calls

```tsx [|2|4-6|7]
const MyComponent = () => {
  const name = 'steve';

  const capitalize = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);

  return <div>{capitalize(name)}</div>;
};
```

```html
<div>Steve</div>
```
<!-- .element: class="fragment" -->