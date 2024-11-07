### Conditions

```tsx
const MyComponent = () => {
  const name = '' // or null | 0 | false | undefined;

  return name ? <div>{name}</div> : <div>Nobody</div>;
};
```
<!-- .element: data-id="code-animation" -->

```html
<div>Nobody</div>
```
<!-- .element: data-id="dom-animation" -->