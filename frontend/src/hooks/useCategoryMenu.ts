import { useEffect, useState } from 'react';
import { Category } from '../types/common';
import { todoService } from '../services/todoService';
import { useNavigate } from 'react-router-dom';

const useCategoryMenu = (categories: Category[], selectedMenuIndex?: number) => {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<null | number>(null);

  useEffect(() => {
    setSelectedCategoryIndex(selectedMenuIndex || 0);
  }, [selectedMenuIndex]);

  const removeCategoryHandler = async (id: string) => {
    const response = await todoService.removeCategory(id);
    setAllCategories(response);

    if (response.length === 0) {
      return navigate('/');
    }
    const indexRemovedCategory = allCategories.findIndex((category) => category.id === id);

    if (selectedCategoryIndex === indexRemovedCategory) {
      navigate(`/categories/${allCategories[0].id}`);
    }
  };

  const addNewCategory = async (value: string) => {
    const response = await todoService.addNewCategory(value);
    setAllCategories(response);
    navigate(`/categories/${response[response.length - 1].id}`);
  };

  const updateCategoryHandler = async ({ name, id }: { name: string; id: string }) => {
    const response = await todoService.updateCategory({ name, id });
    setAllCategories(response);
  };

  return { allCategories, removeCategoryHandler, addNewCategory, updateCategoryHandler };
};
export default useCategoryMenu;
