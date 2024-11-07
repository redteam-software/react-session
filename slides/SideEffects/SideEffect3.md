```tsx [|2|6-8]
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
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