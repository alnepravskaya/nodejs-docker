import { Category, CategoryInfo } from '../../../types/common';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './todoHeader.module.css';

const ToDoHeader = (props: {
  category: CategoryInfo;
  onUpdateCategory: ({ name, id }: { name: string; id: string }) => void;
}) => {
  const {
    category: { name, id },
    onUpdateCategory
  } = props;

  useEffect(() => {
    setTextValue(name);
  }, [name]);

  const [textValue, setTextValue] = useState(name);

  const changeCategoryNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const updateCategoryNameHandler = () => {
    onUpdateCategory({ id, name: textValue });
  };

  return (
    <div className={styles.toDoHeader}>
      <input
        type="text"
        value={textValue}
        onChange={changeCategoryNameHandler}
        onBlur={updateCategoryNameHandler}
      />
    </div>
  );
};

export default ToDoHeader;
