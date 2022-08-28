import PropTypes from 'prop-types';
import { useState } from 'react';

import { nanoid } from 'nanoid';
import { Form, Input, Button, Label } from './ContactForm.styled';

export default function ContactForm({ addContact, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const numberInputId = nanoid();
  const nameInputId = nanoid();

  const handleChange = event => {
    const { name } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(event.currentTarget.value);
        break;

      case 'number':
        setNumber(event.currentTarget.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    addContact({
      id: nanoid(),
      name: name,
      number: number,
    });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>Name</Label>
      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id={nameInputId}
        value={name}
        onChange={handleChange}
      />
      <Label htmlFor={numberInputId}>Number</Label>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        id={numberInputId}
        value={number}
        onChange={handleChange}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
