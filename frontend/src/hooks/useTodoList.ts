import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CategoryInfo, ItemList, ItemListLevel } from '../types/common';
import { todoService } from '../services/todoService';

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

  const addNewItemHandler = async ({
    value,
    index,
    level,
    id
  }: {
    value: string;
    index?: number;
    level?: ItemListLevel;
    id?: string;
  }) => {
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

      setSelectedCategoryInfo((prev) => ({ ...prev, list: updatedList } as CategoryInfo));

      await todoService.addNewItem(selectedCategoryInfo.id, updatedList);
    }
  };

  const updateItemHandler = async (item: ItemList, id: string) => {
    if (selectedCategoryInfo?.id) {
      const updatedList = [...selectedCategoryInfo.list];

      const updatedItemIndex = updatedList.findIndex((item) => item.id === id);
      updatedList[updatedItemIndex] = item;

      setSelectedCategoryInfo((prev) => ({ ...prev, list: updatedList } as CategoryInfo));

      await todoService.updateItem(selectedCategoryInfo.id, updatedList);
    }
  };

  const removeItemHandler = async (id: string) => {
    if (selectedCategoryInfo) {
      const updatedList = selectedCategoryInfo?.list.filter((item) => id !== item.id);
      setSelectedCategoryInfo((prev) => ({ ...prev, list: updatedList } as CategoryInfo));

      await todoService.removeItem(selectedCategoryInfo.id, updatedList);
    }
  };

  return {
    selectedCategoryInfo,
    addNewItemHandler,
    updateItemHandler,
    removeItemHandler,
    currentIndexFocus
  };
};
export default useTodoList;
