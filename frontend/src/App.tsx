import React, { useEffect, useState } from 'react';
import './App.css';
import ListItemForm from './components/ListItemForm/ListItemForm';
import CategoryForm from './components/CategoryForm/CategoryForm';
import ToDoList from './components/ToDoList/ToDoList';
import { Category, CategoryInfo, ItemList } from './types/common';
import Menu from './components/Menu/Menu';
import { todoService } from './services/todoService';

function App() {
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<CategoryInfo | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [selectedListIndex, setSelectedListIndex] = useState(0);

  const getPageInfo = async () => {
    const categoriesResponse = await todoService.getAllCategories();
    setAllCategories(categoriesResponse);
    const categoryId = categoriesResponse?.[0]?.id;

    if (categoryId) {
      const categoryInfoResponse = await todoService.getCategoryInfo(categoryId);
      setSelectedCategoryInfo(categoryInfoResponse);
    }
  };

  useEffect(() => {
    void getPageInfo();
  }, []);

  const updateSelectedList = (id: string) => {
    const newSelectedListIndex = allCategories.findIndex((category) => category.id === id);
    setSelectedListIndex(newSelectedListIndex !== -1 ? newSelectedListIndex : 0);
  };

  const addNewCategory = async (value: string) => {
    const response = await todoService.addNewCategory(value);
    setAllCategories(response);
  };

  const addNewItemHandler = async (value: string) => {
    if (selectedCategoryInfo?.id) {
      const response = await todoService.addNewItem(selectedCategoryInfo?.id, value);
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
    <div className="app">
      <div className="category-line">
        {!!allCategories.length && (
          <Menu
            options={allCategories}
            updateSelectedList={updateSelectedList}
            selectedListIndex={selectedListIndex}
          />
        )}
        <CategoryForm onSubmit={addNewCategory} />
      </div>
      {selectedCategoryInfo && (
        <ToDoList
          list={selectedCategoryInfo.list}
          onUpdateItem={updateItemHandler}
          onRemoveItem={removeItemHandler}
        />
      )}
      <ListItemForm onSubmit={addNewItemHandler} />
    </div>
  );
}

export default App;
