import { SyntheticEvent, useState } from 'react';

const Form = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
