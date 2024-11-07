### Pure Function

- Deterministic: Given same input produces same output
- Immutable: Does not modify input data or rely on external state

<!-- .element: class="fragment" -->

```js
function add(a, b) {
  return a + b;
}
```
<!-- .element: class="fragment" -->

```js
let count = 0;
function addAndLog(a, b) {
  count++; // Modifies external state
  console.log(count); // Side effect: logging
  return a + b;
}
```
<!-- .element: class="fragment" -->