import React, { ChangeEvent, useState } from 'react';
import styles from './addCategory.module.css';
import { ENTER } from '../../ToDoList/ToDoItem/constants';

const AddCategory = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const submitForm = () => {
    if (value.trim() !== '') {
      onSubmit(value);
      setValue('');
    }
  };

  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === ENTER) {
      submitForm();
    }
  };

  return (
    <div className={styles.addCategory}>
      <input type="text" value={value} onChange={changeValueHandler} onKeyDown={keyDownHandler} />
      <button type="submit" onClick={submitForm} disabled={value === ''}>
        Add
      </button>
    </div>
  );
};

export default AddCategory;
