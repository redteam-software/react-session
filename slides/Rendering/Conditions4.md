### Conditions

```tsx [7]
const MyComponent = () => {
  const name = 'Steve';

  return <h1>
    <div className="label">Name:</div>
      <div className="value">
        {name && <div>{name}</div>}
      </div>
    </h1>
};
```
<!-- .element: data-id="code-animation" data-line-numbers -->