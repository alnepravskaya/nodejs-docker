import React, { useEffect, useState } from 'react';
import './styles.css';
import MenuItem from './MenuItem/MenuItem';
import AddCategory from '../AddCategory/AddCategory';
import { todoService } from '../../services/todoService';
import { Category } from '../../types/common';
import { useNavigate } from 'react-router-dom';

const Menu = (props: {
  categoriesList: { id: string; name: string }[];
  selectedMenuIndex?: number;
}) => {
  const navigate = useNavigate();

  const { categoriesList, selectedMenuIndex } = props;

  const [allCategories, setAllCategories] = useState<Category[]>(categoriesList);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(selectedMenuIndex || 0);

  useEffect(() => {
    setSelectedCategoryIndex(selectedMenuIndex || 0);
  }, [selectedMenuIndex]);

  const updateCategoryHandler = async ({ name, id }: { name: string; id: string }) => {
    const response = await todoService.updateCategory({ name, id });
    setAllCategories(response);
  };

  const removeCategoryHandler = async (id: string) => {
    const response = await todoService.removeCategory(id);
    setAllCategories(response);

    const indexRemovedCategory = allCategories.findIndex((category) => category.id === id);

    if (selectedCategoryIndex === indexRemovedCategory) {
      navigate(`/categories/${allCategories[0].id}`);
    }
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
            onUpdateCategory={updateCategoryHandler}
            onRemoveCategory={removeCategoryHandler}
          />
        ))}
      </nav>
      <AddCategory onSubmit={addNewCategory} />
    </div>
  );
};

export default Menu;
