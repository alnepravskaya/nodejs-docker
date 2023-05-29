import { Category, CategoryInfo, ItemList, List } from '../types/common';
import { apiRequest } from '../utils/apiRequest';

export const todoService = {
  getAllCategories: async (): Promise<Category[]> => {
    return await apiRequest.get('/todoCategories');
  },
  getCategoryInfo: async (categoryId: string): Promise<CategoryInfo> => {
    return await apiRequest.get(`/todoCategories/${categoryId}`);
  },
  addNewCategory: async (value: string): Promise<Category[]> => {
    return await apiRequest.post('/todoCategories', { name: value });
  },
  removeCategory: async (id: string): Promise<Category[]> => {
    return await apiRequest.delete('/todoCategories/' + id);
  },
  updateCategory: async ({ name, id }: { name: string; id: string }): Promise<Category[]> => {
    return await apiRequest.post('/todoCategories/update', { name, id });
  },
  addNewItem: async (categoryId: string, updatedList: List): Promise<CategoryInfo> => {
    return await apiRequest.post('/addNewItem', { categoryId, updatedList });
  },
  updateItem: async (categoryId: string, updatedList: List): Promise<CategoryInfo> => {
    return await apiRequest.post('/updateItem', { categoryId, updatedList });
  },
  removeItem: async (categoryId: string, updatedList: List): Promise<CategoryInfo> => {
    return await apiRequest.delete('/removeItem', { categoryId, updatedList });
  }
};
