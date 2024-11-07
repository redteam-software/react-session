### Lists

```tsx [|2-11|15|16]
const MyComponent = () => {
  const people = [
    {
      name: 'Steve',
      id: 123,
    },
    {
      name: 'Mary',
      id: 456,
    }
  ];

  return (
    <ul>
      {people.map(person => (
        <li key={person.id}>{person.name}</li>
      )}
    </ul>
  );
};
```

```html
<ul>
  <li>Steve</li>
  <li>Mary</li>
</ul>
```
<!-- .element: class="fragment" -->