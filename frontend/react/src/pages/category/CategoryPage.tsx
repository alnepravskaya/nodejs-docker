import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useCategoryMenu from '../../hooks/useCategoryMenu';
import Menu from '../../components/Menu/Menu';
import ToDoList from '../../components/ToDoList/ToDoList';
import ToDoHeader from '../../components/ToDoList/ToDoHeader/ToDoHeader';
import { LoaderCategoryPage } from './types';
import styles from './categoryPage.module.css';
import commonStyles from '../../commonStyles.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Info from '../../components/Info/info';

const CategoryPage = () => {
  const { categories, categoryInfo, selectedMenuIndex } = useLoaderData() as LoaderCategoryPage;

  const { allCategories, removeCategoryHandler, updateCategoryHandler, addNewCategoryHandler } =
    useCategoryMenu(categories, selectedMenuIndex);

  return (
    <div className={styles.categoryPage}>
      <ToastContainer />
      <Menu
        categoriesList={categories}
        allCategories={allCategories}
        onRemoveCategory={removeCategoryHandler}
        onAddNewCategory={addNewCategoryHandler}
      />
      <div className={`${styles.container} ${commonStyles.container}`}>
        {!!categoryInfo?.id && (
          <ToDoHeader category={categoryInfo} onUpdateCategory={updateCategoryHandler} />
        )}
        {categoryInfo?.list && <ToDoList />}
      </div>
      <Info />
    </div>
  );
};

export default CategoryPage;
