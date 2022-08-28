import { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Section from './Section';
import Filter from './Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const deleteContact = (id, name) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
    Notify.success(`${name} deleted from your phonebook`, { timeout: 2000 });
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const addContact = data => {
    return contacts.map(contact => contact.name).includes(data.name)
      ? Notify.warning(`${data.name} is already in contacts`, { timeout: 2000 })
      : setContacts([...contacts, data]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} handleChange={handleFilterChange} />
      </Section>
      <ContactList
        visibleContacts={filter ? getVisibleContacts() : contacts}
        deleteContact={deleteContact}
      />
    </>
  );
}
