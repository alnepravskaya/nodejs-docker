import { Category, CategoryInfo } from '../../types/common';

export interface LoaderCategoryPage {
  categories: Category[];
  categoryInfo: CategoryInfo | null;
  selectedMenuIndex: number;
}
