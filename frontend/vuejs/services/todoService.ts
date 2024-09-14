import {ref} from 'vue'
import {APICategoryResponse} from './types';
import {Category, CategoryInfo, List} from "../src/types/common";
import {apiRequest} from "../utils/apiRequest";

export const todoService = {
    allCategories: ref([]),
    async getAllCategories(): Promise<Category[]> {
        const categoriesResponse =  await apiRequest.get('/todoCategories');
        this.allCategories.value = categoriesResponse;
    },
    async getCategoryInfo(categoryId: string): Promise<CategoryInfo> {
        return await apiRequest.get(`/todoCategories/${categoryId}`);
    },
    async addNewCategory(value: string): Promise<APICategoryResponse> {
        const categoriesResponse = await apiRequest.post('/todoCategories', {name: value});
        this.allCategories.value = categoriesResponse.body;
    },
    async removeCategory(id: string): Promise<APICategoryResponse> {
        const categoriesResponse = await apiRequest.delete('/todoCategories/' + id);
        this.allCategories.value = categoriesResponse.body;
    },
    async updateCategory({
                             name,
                             id
                         }: {
        name: string;
        id: string;
    }): Promise<APICategoryResponse> {
        const categoriesResponse = await apiRequest.post('/todoCategories/update', {name, id});
        this.allCategories.value = categoriesResponse.body;
    },
    updateList: async (categoryId: string, updatedList: List): Promise<{ status: number }> => {
        return await apiRequest.post('/updateList', {categoryId, updatedList});
    }
};
