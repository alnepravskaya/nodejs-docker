import { APICategoryResponse } from './types';
import {Category, CategoryInfo, List} from "../src/types/common";
import {apiRequest} from "../utils/apiRequest";

export const todoService = {
  getAllCategories: async (): Promise<Category[]> => {
    return await apiRequest.get('/todoCategories');
  },
  getCategoryInfo: async (categoryId: string): Promise<CategoryInfo> => {
    return await apiRequest.get(`/todoCategories/${categoryId}`);
  },
  addNewCategory: async (value: string): Promise<APICategoryResponse> => {
    return await apiRequest.post('/todoCategories', { name: value });
  },
  removeCategory: async (id: string): Promise<APICategoryResponse> => {
    return await apiRequest.delete('/todoCategories/' + id);
  },
  updateCategory: async ({
    name,
    id
  }: {
    name: string;
    id: string;
  }): Promise<APICategoryResponse> => {
    return await apiRequest.post('/todoCategories/update', { name, id });
  },
  updateList: async (categoryId: string, updatedList: List): Promise<{ status: number }> => {
    return await apiRequest.post('/updateList', { categoryId, updatedList });
  }
};
