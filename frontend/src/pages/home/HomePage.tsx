import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Category } from '../../types/common';
import { todoService } from '../../services/todoService';
import useCategoryMenu from '../../hooks/useCategoryMenu';

const HomePage = () => {
  const { categories } = useLoaderData() as { categories: Category[] };
  const { allCategories, removeCategoryHandler, addNewCategory } = useCategoryMenu(categories);

  return (
    <>
      <Menu
        categoriesList={categories}
        allCategories={allCategories}
        onRemoveCategory={removeCategoryHandler}
        onAddNewCategory={addNewCategory}
      />
      <h4>Please add new category or choose from existing</h4>
    </>
  );
};

export default HomePage;
