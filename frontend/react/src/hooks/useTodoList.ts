import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { CategoryInfo, ItemList, ItemListLevel, List } from '../types/common';
import { todoService } from '../services/todoService';
import { NEW_ITEM } from '../components/ToDoList/ToDoItem/constants';
import { SERVER_ERROR } from '../contants/contants';

const useTodoList = (categoryInfo: CategoryInfo | null) => {
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState<CategoryInfo | null>(
    categoryInfo
  );

  const [currentIndexFocus, setCurrentIndexFocus] = useState(
    selectedCategoryInfo?.list.length || 0
  );

  useEffect(() => {
    setSelectedCategoryInfo(categoryInfo);
  }, [categoryInfo]);

  const updateTodoList = useCallback(
    async (updatedList: List) => {
      if (selectedCategoryInfo) {
        setSelectedCategoryInfo((prev) => ({ ...prev, list: updatedList } as CategoryInfo));
        const response = await todoService.updateList(selectedCategoryInfo.id, updatedList);

        if (response?.status !== 200) {
          toast.error(SERVER_ERROR, {
            position: 'top-center',
            hideProgressBar: false
          });
        }
      }
    },
    [selectedCategoryInfo]
  );

  const addNewItemHandler = useCallback(
    async ({ value, level, id }: { value: string; level?: ItemListLevel; id?: string }) => {
      if (selectedCategoryInfo?.list) {
        const updatedList = [...selectedCategoryInfo?.list];
        const newItemSiblingIndex = updatedList.findIndex((item) => item.id === id);

        setCurrentIndexFocus(
          newItemSiblingIndex !== undefined ? newItemSiblingIndex + 1 : updatedList.length + 1
        );

        updatedList.splice(
          newItemSiblingIndex !== -1 ? newItemSiblingIndex + 1 : updatedList.length,
          0,
          {
            text: value,
            isDone: false,
            level: level || ItemListLevel['level-0'],
            id: uuidv4()
          }
        );

        await updateTodoList(updatedList);
      }
    },
    [selectedCategoryInfo, updateTodoList]
  );

  const updateItemHandler = useCallback(
    async (item: ItemList) => {
      if (selectedCategoryInfo?.id) {
        const updatedList =
          item.id === NEW_ITEM
            ? [...selectedCategoryInfo.list, { ...item, id: uuidv4() }]
            : selectedCategoryInfo.list.map((listItem) =>
                item.id === listItem.id ? item : listItem
              );

        await updateTodoList(updatedList);
      }
    },
    [selectedCategoryInfo, updateTodoList]
  );

  const removeItemHandler = useCallback(
    async (id: string) => {
      if (selectedCategoryInfo) {
        const updatedList = selectedCategoryInfo?.list.filter((item) => id !== item.id);

        await updateTodoList(updatedList);
      }
    },
    [selectedCategoryInfo, updateTodoList]
  );

  return {
    selectedCategoryInfo,
    addNewItemHandler,
    updateItemHandler,
    removeItemHandler,
    currentIndexFocus
  };
};
export default useTodoList;
