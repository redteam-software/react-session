### Fragments

```tsx [|4-6|11,14]
const MyComponent = () => {
  const data = fetchData();

  const listItems = () => data.map(item => (
    <li key={item.id}>{item}</li>
  ));

  return (
    <>
      <aside>
        <ul>{listItems()}</ul>
      </aside>
      <h2>Found Data</h2>
      <ul>{listItems()}</ul>
    </>
  );
};
```
