import { useCallback, useEffect, useState } from 'react';
import { Category } from '../types/common';
import { todoService } from '../services/todoService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APICategoryResponse } from '../services/types';
import { SERVER_ERROR } from '../contants/contants';

const useCategoryMenu = (categories: Category[], selectedMenuIndex?: number) => {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<null | number>(null);

  useEffect(() => {
    setSelectedCategoryIndex(selectedMenuIndex || 0);
  }, [selectedMenuIndex]);

  const updateAllCategories = useCallback((response: APICategoryResponse) => {
    if (response?.status !== 200) {
      toast.error(SERVER_ERROR, {
        position: 'top-center',
        hideProgressBar: false
      });
    } else {
      setAllCategories(response.body);
    }
  }, []);

  const removeCategoryHandler = useCallback(
    async (id: string) => {
      const response = await todoService.removeCategory(id);
      updateAllCategories(response);

      if (response.body.length === 0) {
        return navigate('/');
      }

      const indexRemovedCategory = allCategories?.findIndex((category) => category.id === id);

      if (selectedCategoryIndex === indexRemovedCategory) {
        return navigate(`/categories/${allCategories[0].id}`);
      }
    },
    [allCategories, selectedCategoryIndex]
  );

  const addNewCategoryHandler = useCallback(async (value: string) => {
    const response = await todoService.addNewCategory(value);
    updateAllCategories(response);

    navigate(`/categories/${response.body[response.body.length - 1].id}`);
  }, []);

  const updateCategoryHandler = useCallback(async ({ name, id }: { name: string; id: string }) => {
    const response = await todoService.updateCategory({ name, id });

    updateAllCategories(response);
  }, []);

  return { allCategories, removeCategoryHandler, addNewCategoryHandler, updateCategoryHandler };
};
export default useCategoryMenu;
