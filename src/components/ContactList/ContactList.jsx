import ContactListItem from 'components/ContactListItem';
import { List, Message } from './ContactList.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContacts, getFilter } from '../redux/contactSlice';

function ContactList() {
  const contactsInState = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  function visibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return filter
      ? contactsInState.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contactsInState;
  }
  const contacts = visibleContacts();

  return (
    <List>
      {contacts.length ? (
        contacts.map(({ name, number, id }) => (
          <ContactListItem
            name={name}
            number={number}
            key={id}
            handleClick={() => {
              dispatch(deleteContact(id, name));
              Notify.success(`${name} deleted from your phonebook`, {
                timeout: 2000,
              });
            }}
          />
        ))
      ) : (
        <Message>You have no contacts yet&#129335;</Message>
      )}
    </List>
  );
}

export default ContactList;
