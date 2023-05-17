import React, { useEffect, useState } from 'react';
import './App.css';
import AddtemField from './components/AddItemField/AddtemField';
import CategoryForm from './components/CategoryForm/CategoryForm';
import ToDoList from './components/ToDoList/ToDoList';
import { Category, CategoryInfo, ItemList } from './types/common';
import Menu from './components/Menu/Menu';
import { todoService } from './services/todoService';

function App() {
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<CategoryInfo | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

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

  const updateSelectedList = async (id: string) => {
    const newSelectedListIndex = allCategories.findIndex((category) => category.id === id);
    setSelectedCategoryIndex(newSelectedListIndex !== -1 ? newSelectedListIndex : 0);
    const categoryInfoResponse = await todoService.getCategoryInfo(
      allCategories[newSelectedListIndex].id
    );
    setSelectedCategoryInfo(categoryInfoResponse);
  };

  const updateCategoryHandler = async ({ name, id }: { name: string; id: string }) => {
    const response = await todoService.updateCategory({ name, id });
    setAllCategories(response);
  };

  const addNewCategory = async (value: string) => {
    const response = await todoService.addNewCategory(value);
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
    <div className="app">
      <div className="category-line">
        {!!allCategories.length && (
          <Menu
            options={allCategories}
            updateSelectedList={updateSelectedList}
            selectedCategoryIndex={selectedCategoryIndex}
            onUpdateCategory={updateCategoryHandler}
            onRemoveCategory={removeCategoryHandler}
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
      <AddtemField onSubmit={addNewItemHandler} />
    </div>
  );
}

export default App;
