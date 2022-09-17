import { nanoid } from 'nanoid';
import { Label, Input } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilter } from '../redux/contactSlice';

function Filter() {
  const inputId = nanoid();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <>
      <Label htmlFor={inputId}>Find contacts by name</Label>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={event => dispatch(changeFilter(event.target.value))}
      />
    </>
  );
}

export default Filter;
