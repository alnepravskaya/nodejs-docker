import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const MenuItem = (props: {
  id: string;
  name: string;
  onUpdateCategory: ({ name, id }: { name: string; id: string }) => void;
  onRemoveCategory: (id: string) => void;
}) => {
  const { id, name, onUpdateCategory, onRemoveCategory } = props;
  const [textValue, setTextValue] = useState(name);

  const changeCategoryNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const updateCategoryNameHandler = () => {
    onUpdateCategory({ id, name: textValue });
  };

  return (
    <>
      <NavLink
        to={`/categories/${id}`}
        className={({ isActive }) => (isActive ? 'category selected' : 'category')}
      >
        <input
          type="text"
          value={textValue}
          onChange={changeCategoryNameHandler}
          onBlur={updateCategoryNameHandler}
        />
      </NavLink>
      <button className="btn-remove" onClick={onRemoveCategory.bind(null, id)}>
        X
      </button>
    </>
  );
};

export default MenuItem;
