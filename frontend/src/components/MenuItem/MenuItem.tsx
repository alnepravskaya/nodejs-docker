import { ChangeEvent, useState } from 'react';
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
    onUpdateSelectedCategory(e.target.name);
  };

  console.log(selectedCategoryId, id, selectedCategoryId === id);
  return (
    <div className={`category ${selectedCategoryId === id ? 'selected' : ''}`}>
      <input
        type="radio"
        id={id}
        name={id}
        checked={selectedCategoryId === id}
        onChange={updateSelectedCategoryHandler}
      />

      <input
        type="text"
        value={textValue}
        onChange={changeCategoryNameHandler}
        onBlur={updateCategoryNameHandler}
      />
      <button className="btn-remove" onClick={onRemoveCategory.bind(null, id)}>
        X
      </button>
    </div>
  );
};

export default MenuItem;
