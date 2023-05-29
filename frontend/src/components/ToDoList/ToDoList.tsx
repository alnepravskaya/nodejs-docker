import { ItemList, ItemListLevel, List } from '../../types/common';
import ToDoItem from './ToDoItem/ToDoItem';
import styles from './todolist.module.css';
import useTodoList from '../../hooks/useTodoList';
import { useLoaderData } from 'react-router-dom';
import { LoaderCategoryPage } from '../../pages/category/types';
import ToDoHeader from './ToDoHeader/ToDoHeader';
import React from 'react';
import useCategoryMenu from '../../hooks/useCategoryMenu';

const ToDoList = () => {
  const { categoryInfo } = useLoaderData() as LoaderCategoryPage;

  const {
    selectedCategoryInfo,
    currentIndexFocus,
    addNewItemHandler,
    updateItemHandler,
    removeItemHandler
  } = useTodoList(categoryInfo);

  const listLength = selectedCategoryInfo?.list.length;

  return (
    <>
      <ul className={styles['todo-list']}>
        {selectedCategoryInfo?.list?.map((item, index) => (
          <ToDoItem
            currentIndexFocus={currentIndexFocus}
            index={index}
            item={item}
            key={item.id}
            onUpdateItem={updateItemHandler}
            onRemoveItem={removeItemHandler}
            onAddItem={addNewItemHandler}
          />
        ))}

        <ToDoItem
          currentIndexFocus={currentIndexFocus}
          index={listLength || 0}
          key="new-item"
          item={{
            text: '',
            isDone: false,
            level: ItemListLevel['level-0'],
            id: ''
          }}
          isLastItem={true}
          onUpdateItem={updateItemHandler}
          onRemoveItem={() => {}}
          onAddItem={addNewItemHandler}
        />
      </ul>
    </>
  );
};

export default ToDoList;
