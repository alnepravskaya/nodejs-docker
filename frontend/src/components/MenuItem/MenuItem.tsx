import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const MenuItem = (props: {
  id: string;
  name: string;
  selectedCategoryId: string;
  onUpdateCategory: ({ name, id }: { name: string; id: string }) => void;
  onUpdateSelectedCategory: (id: string) => void;
  onRemoveCategory: (id: string) => void;
}) => {
  const {
    id,
    name,
    selectedCategoryId,
    onUpdateCategory,
    onUpdateSelectedCategory,
    onRemoveCategory
  } = props;
  const [textValue, setTextValue] = useState(name);

  const changeCategoryNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const updateCategoryNameHandler = () => {
    onUpdateCategory({ id, name: textValue });
  };

  const updateSelectedCategoryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    debugger;
    onUpdateSelectedCategory(e.target.name);
  };

  return (
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
      <button className="btn-remove" onClick={onRemoveCategory.bind(null, id)}>
        X
      </button>
    </NavLink>
  );
};

export default MenuItem;
