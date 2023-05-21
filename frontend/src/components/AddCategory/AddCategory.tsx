import { useState } from 'react';

const AddCategory = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const submitForm = () => {
    onSubmit(value);
    setValue('');
  };

  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit" onClick={submitForm} disabled={value === ''}>
        Add new category
      </button>
    </div>
  );
};

export default AddCategory;
