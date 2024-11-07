```tsx [12|16]
import { FC, useEffect } from 'react';

interface ContactListProps {
  region?: string;
}

const ContactList: FC<ContactListProps> = ({ region }) => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    async function getContacts() {
      const newContacts = await fetchContactsFromAPI(region);
      setContacts(newContacts);
    }
    getContacts();
  }, [region]);

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