import React from 'react';
import Menu from '../../components/Menu/Menu';
import { useLoaderData } from 'react-router-dom';
import { Category } from '../../types/common';
import useCategoryMenu from '../../hooks/useCategoryMenu';
import commonStyles from '../../commonStyles.module.css';

const HomePage = () => {
  const { categories } = useLoaderData() as { categories: Category[] };
  const { allCategories, removeCategoryHandler, addNewCategoryHandler } =
    useCategoryMenu(categories);

  return (
    <div className={commonStyles.pageContainer}>
      <Menu
        categoriesList={categories}
        allCategories={allCategories}
        onRemoveCategory={removeCategoryHandler}
        onAddNewCategory={addNewCategoryHandler}
      />
      <div className={commonStyles.container}>
        <h1>Please add new category or choose from existing</h1>
      </div>
    </div>
  );
};

export default HomePage;
