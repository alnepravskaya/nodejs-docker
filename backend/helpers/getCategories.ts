import { CategoryInfo } from '../types/common';

const { dbCollection } = require('../utils/database');

export const getAllTodoCategories = async () => {
  const response = await dbCollection('todoCategories').find({}, { name: 1, id: 1 }).toArray();
  return response;
};

export const getCategory = async (categoryId: string): Promise<CategoryInfo> => {
  const categoryInfo = await dbCollection('todoCategories').find({ id: categoryId }).toArray();
  return categoryInfo[0];
};
