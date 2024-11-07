### Component State

```tsx [|2]
const Message = () => {
  let name = '';
  
  const handleNameClick = () => {
    name = getRandomName();
  }
  
  return <h1 onClick={handleNameClick}>Hello {name}</h1>;
}
```
<!-- .element: data-id="code-animation" -->