import { CategoryInfo } from '../types/common';
import { TODO_CATEGORIES } from '../contants/constants';

const { dbCollection } = require('../utils/database');

export const getAllTodoCategories = async () => {
  const response = await dbCollection(TODO_CATEGORIES).find({}).project({ list: false }).toArray();
  return response;
};

export const getCategory = async (categoryId: string): Promise<CategoryInfo> => {
  const categoryInfo = await dbCollection(TODO_CATEGORIES).findOne({ id: categoryId });
  return categoryInfo;
};
