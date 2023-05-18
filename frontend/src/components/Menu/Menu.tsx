import React, { ChangeEvent, useState } from 'react';
import './styles.css';
import MenuItem from '../MenuItem/MenuItem';
import { todoService } from '../../services/todoService';
import { Category } from '../../types/common';
import CategoryForm from '../CategoryForm/CategoryForm';

const Menu = (props: {
  categoriesList: { id: string; name: string }[];
  selectedMenuIndex?: number;
}) => {
  const { categoriesList, selectedMenuIndex } = props;

  const [allCategories, setAllCategories] = useState<Category[]>(categoriesList);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(selectedMenuIndex || 0);

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoriesList[0].id);

  const updateSelectedCategoryHandler = (id: string) => {
    setSelectedCategoryId(id);
  };

  const updateCategoryHandler = async ({ name, id }: { name: string; id: string }) => {
    const response = await todoService.updateCategory({ name, id });
    setAllCategories(response);
  };

  const removeCategoryHandler = async (id: string) => {
    const indexRemovedCategory = allCategories.findIndex((category) => category.id === id);
    if (selectedCategoryIndex === indexRemovedCategory) {
      setSelectedCategoryIndex(0);
    }
    const response = await todoService.removeCategory(id);
    setAllCategories(response);
  };

  const addNewCategory = async (value: string) => {
    const response = await todoService.addNewCategory(value);
    setAllCategories(response);
  };

  return (
    <div className="category-line">
      <nav className="categories">
        {allCategories?.map(({ name, id }) => (
          <MenuItem
            key={id}
            id={id}
            name={name}
            selectedCategoryId={selectedCategoryId}
            onUpdateCategory={updateCategoryHandler}
            onUpdateSelectedCategory={updateSelectedCategoryHandler}
            onRemoveCategory={removeCategoryHandler}
          />
        ))}
      </nav>
      <CategoryForm onSubmit={addNewCategory} />
    </div>
  );
};

export default Menu;
