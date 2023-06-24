import { APICategoryResponse } from './types';
import {Category, CategoryInfo, List} from "../src/types/common";
import {apiRequest} from "../utils/apiRequest";

export const todoService = {
  async getAllCategories  (): Promise<Category[]> {
    return await apiRequest.get('/todoCategories');
  },
  async getCategoryInfo(categoryId: string): Promise<CategoryInfo> {
    return await apiRequest.get(`/todoCategories/${categoryId}`);
  },
  async  addNewCategory (value: string): Promise<APICategoryResponse>  {
    return await apiRequest.post('/todoCategories', { name: value });
  },
  async removeCategory  (id: string): Promise<APICategoryResponse> {
    return await apiRequest.delete('/todoCategories/' + id);
  },
  async updateCategory  ({
    name,
    id
  }: {
    name: string;
    id: string;
  }): Promise<APICategoryResponse> {
    return await apiRequest.post('/todoCategories/update', { name, id });
  },
  updateList: async (categoryId: string, updatedList: List): Promise<{ status: number }> => {
    return await apiRequest.post('/updateList', { categoryId, updatedList });
  }
};
