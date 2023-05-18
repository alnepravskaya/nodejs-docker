import { ItemList, List } from '../../types/common';
import ToDoItem from './ToDoItem/ToDoItem';
import './styles.css';

const ToDoList = ({
  list,
  onUpdateItem,
  onRemoveItem
}: {
  list: List;
  onUpdateItem: (item: ItemList) => void;
  onRemoveItem: (id: string) => void;
}) => {
  return (
    <ul className="todo-list">
      {list?.map((item) => (
        <ToDoItem
          item={item}
          key={item.id}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
