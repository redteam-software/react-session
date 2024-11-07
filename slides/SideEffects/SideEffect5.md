```tsx [6]
import { useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {}, []);

  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>{contact.name} : {contact.phoneNumber}</li>
      ))}
    </ul>
  );
}
```
<!-- .element: data-id="code-animation" -->