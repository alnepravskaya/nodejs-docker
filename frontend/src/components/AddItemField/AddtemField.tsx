import { useState } from 'react';
import './styles.css';

const AddItemField = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const addNewItemHandler = () => {
    onSubmit(value);
    setValue('');
  };

  return (
    <div className="addItemField">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addNewItemHandler}>Add</button>
    </div>
  );
};

export default AddItemField;
