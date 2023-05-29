import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import ToDoList from '../../components/ToDoList/ToDoList';
import ToDoHeader from '../../components/ToDoList/ToDoHeader/ToDoHeader';
import { LoaderCategoryPage } from './types';
import useCategoryMenu from '../../hooks/useCategoryMenu';
import styles from './categoryPage.module.css';

const CategoryPage = () => {
  const { categories, categoryInfo, selectedMenuIndex } = useLoaderData() as LoaderCategoryPage;

  const { allCategories, removeCategoryHandler, updateCategoryHandler, addNewCategory } =
    useCategoryMenu(categories, selectedMenuIndex);

  return (
    <div className={styles.categoryPage}>
      <Menu
        categoriesList={categories}
        allCategories={allCategories}
        onRemoveCategory={removeCategoryHandler}
        onAddNewCategory={addNewCategory}
      />
      <div className={styles.container}>
        {!!categoryInfo?.id && (
          <ToDoHeader category={categoryInfo} onUpdateCategory={updateCategoryHandler} />
        )}
        {categoryInfo?.list && <ToDoList />}
      </div>
    </div>
  );
};

export default CategoryPage;
