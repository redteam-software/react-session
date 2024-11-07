```tsx [|8]
const Message = () => {
  return <h1>Hello World</h1>;
};

function App() {
  return (
    <div className="App">
      <Message />
    </div>
  );
}
```
<!-- .element data-id="code-animation" data-trim data-line-numbers -->

Notes:
Steps
- All
- Line 8

Comments
- This is great if we wanted to have all of our components in the same file.
- That's not scalable
- How do we allow our component to be imported into other files?