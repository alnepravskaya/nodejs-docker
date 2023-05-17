import { Category, CategoryInfo, ItemList } from '../types/common';
import { apiRequest } from '../utils/apiRequest';

export const todoService = {
  getAllCategories: async (): Promise<Category[]> => {
    return await apiRequest({
      url: '/todoCategories',
      method: 'GET'
    });
  },
  getCategoryInfo: async (categoryId: string): Promise<CategoryInfo> => {
    return await apiRequest({
      url: `/todoCategories/${categoryId}`,
      method: 'GET'
    });
  },
  addNewCategory: async (value: string): Promise<Category[]> => {
    return await apiRequest({
      url: '/todoCategories',
      method: 'POST',
      body: { name: value }
    });
  },
  removeCategory: async (id: string): Promise<Category[]> => {
    return await apiRequest({
      url: '/todoCategories/' + id,
      method: 'DELETE'
    });
  },
  updateCategory: async ({ name, id }: { name: string; id: string }): Promise<Category[]> => {
    return await apiRequest({
      url: '/todoCategories/update',
      method: 'POST',
      body: { name, id }
    });
  },
  addNewItem: async (id: string, value: string): Promise<CategoryInfo> => {
    return await apiRequest({
      url: '/addNewItem',
      method: 'POST',
      body: {
        id,
        value
      }
    });
  },
  updateItem: async (item: ItemList, categoryId: string): Promise<CategoryInfo> => {
    return await apiRequest({
      url: '/updateItem',
      method: 'POST',
      body: { item, categoryId }
    });
  },
  removeItem: async (id: string, categoryId: string): Promise<CategoryInfo> => {
    return await apiRequest({
      url: '/removeItem',
      method: 'POST',
      body: { id, categoryId }
    });
  }
};
