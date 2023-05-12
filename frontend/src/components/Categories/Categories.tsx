import { ChangeEvent, useState } from 'react';
import './styles.css';

const Categories = (props: {
  options: { id: string; name: string }[];
  updateSelectedList: (id: string) => void;
  selectedListIndex: number;
}) => {
  const [value, setValue] = useState(props.options[props.selectedListIndex]?.id);

  const todoListHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name);
    props.updateSelectedList(e.target.name);
  };

  return (
    <div className="categories">
      {props.options?.map(({ name, id }) => (
        <div key={id} className="category">
          <input type="radio" id={id} name={id} checked={value === id} onChange={todoListHandler} />
          <label htmlFor={id}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default Categories;
