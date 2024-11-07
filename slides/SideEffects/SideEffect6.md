```tsx [7-11|7-10|8|9|11|12]
import { useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    async function getContacts() {
      const newContacts = await fetchContactsFromAPI();
      setContacts(newContacts);
    }
    getContacts();
  }, []);

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