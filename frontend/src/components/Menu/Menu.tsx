import { ChangeEvent, useState } from 'react';
import './styles.css';
import MenuItem from '../MenuItem/MenuItem';

const Menu = (props: {
  options: { id: string; name: string }[];
  updateSelectedList: (id: string) => void;
  onUpdateCategory: ({ name, id }: { name: string; id: string }) => void;
  selectedCategoryIndex: number;
  onRemoveCategory: (id: string) => void;
}) => {
  const { options, onUpdateCategory, onRemoveCategory, selectedCategoryIndex } = props;
  //debugger;

  const [selectedCategoryId, setSelectedCategoryId] = useState(options[selectedCategoryIndex].id);
  console.log(options[selectedCategoryIndex].id);
  console.log(selectedCategoryId);
  const updateSelectedCategoryHandler = (id: string) => {
    setSelectedCategoryId(id);
    props.updateSelectedList(id);
  };

  return (
    <div className="categories">
      {options?.map(({ name, id }) => (
        <MenuItem
          key={id}
          id={id}
          name={name}
          selectedCategoryId={selectedCategoryId}
          onUpdateCategory={onUpdateCategory}
          onUpdateSelectedCategory={updateSelectedCategoryHandler}
          onRemoveCategory={onRemoveCategory}
        />
      ))}
    </div>
  );
};

export default Menu;
