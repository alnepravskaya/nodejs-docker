import { todoService } from '../services/todoService';

export const menuLoader = async () => {
  const categories = await todoService.getAllCategories();

  return {
    categories
  };
};
