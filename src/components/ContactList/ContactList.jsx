import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import { List, Message } from './ContactList.styled';

function ContactList({ visibleContacts, deleteContact }) {
  return (
    <List>
      {visibleContacts.length ? (
        visibleContacts.map(({ name, number, id }) => (
          <ContactListItem
            name={name}
            number={number}
            key={id}
            handleClick={() => deleteContact(id, name)}
          />
        ))
      ) : (
        <Message>You have no contacts yet&#129335;</Message>
      )}
    </List>
  );
}

export default ContactList;

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
