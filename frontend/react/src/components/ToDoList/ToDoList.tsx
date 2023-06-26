import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ToDoItem from './ToDoItem/ToDoItem';
import useTodoList from '../../hooks/useTodoList';
import { LoaderCategoryPage } from '../../pages/category/types';
import { ItemListLevel } from '../../types/common';
import { NEW_ITEM } from './ToDoItem/constants';
import styles from './todolist.module.css';

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
      <ul className={styles.todoList}>
        {selectedCategoryInfo?.list.map((item, index) => (
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
            id: NEW_ITEM
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
