import { useState } from 'react';
import { ItemList } from '../../../types/common';
import './styles.css';

const ToDoItem = (props: {
  item: ItemList;
  onUpdateItem: (item: ItemList) => void;
  onRemoveItem: (id: string) => void;
}) => {
  const {
    item: { text, id, isDone },
    onUpdateItem,
    onRemoveItem
  } = props;
  const [newValue, setNewValue] = useState(text);
  const [isChecked, setIsChecked] = useState(isDone);

  const updateHandler = () => {
    onUpdateItem({ ...props.item, text: newValue });
  };

  const editItemStatusHandler = () => {
    setIsChecked((isChecked) => !isChecked);
    onUpdateItem({ ...props.item, isDone: !isChecked });
  };

  return (
    <li key={id} className="list-item">
      <input type="checkbox" checked={isChecked} onChange={editItemStatusHandler} name={id} />
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onBlur={updateHandler}
      />

      <button className="btn-remove" onClick={onRemoveItem.bind(null, id)}>
        X
      </button>
    </li>
  );
};

export default ToDoItem;
