import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import AddItemField from '../components/AddItemField/AddItemField';
import Menu from '../components/Menu/Menu';
import ToDoList from '../components/ToDoList/ToDoList';
import { todoService } from '../services/todoService';
import { Category, CategoryInfo, ItemList } from '../types/common';

const CategoryPage = () => {
  const { categories, categoryInfo, selectedMenuIndex } = useLoaderData() as {
    categories: Category[];
    categoryInfo: CategoryInfo | null;
    selectedMenuIndex: number;
  };

  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<CategoryInfo | null>(null);

  useEffect(() => {
    setSelectedCategoryInfo(categoryInfo);
  }, [categories]);

  const addNewItemHandler = async (value: string) => {
    if (selectedCategoryInfo?.id) {
      const response = await todoService.addNewItem(selectedCategoryInfo.id, value);
      setSelectedCategoryInfo(response);
    }
  };

  const updateItemHandler = async (item: ItemList) => {
    if (selectedCategoryInfo?.id) {
      const response = await todoService.updateItem(item, selectedCategoryInfo.id);
      setSelectedCategoryInfo(response);
    }
  };

  const removeItemHandler = async (id: string) => {
    if (selectedCategoryInfo?.id) {
      const response = await todoService.removeItem(id, selectedCategoryInfo.id);
      setSelectedCategoryInfo(response);
    }
  };

  return (
    <>
      <Menu categoriesList={categories} selectedMenuIndex={selectedMenuIndex} />

      {selectedCategoryInfo?.list && (
        <ToDoList
          list={selectedCategoryInfo.list}
          onUpdateItem={updateItemHandler}
          onRemoveItem={removeItemHandler}
          key={categoryInfo?.id}
        />
      )}
      <AddItemField onSubmit={addNewItemHandler} />
    </>
  );
};

export default CategoryPage;
