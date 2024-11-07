```tsx [|4|11|12-19|1|20-25]
import { Fragment } from 'react';

const MyComponent = () => {
  const data = fetchData();

  return (
    <section>
      <h1>Data Page</h1>
      <p>This is a page with data.</p>

      {data ? (
        <Fragment>
          <h2>Found Data</h2>
          <ul>
           {data.map(item => (
             <li key={item.id}>{item}</li>
           )}
          </ul>
        </Fragment>
      ) : (
        <>
          <h2>No data found</h2>
          <p>Loading...</p>
        </>
      )}
    </section>
  );
};
```