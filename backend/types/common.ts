export interface ItemList {
  id: string;
  text: string;
  isDone: boolean;
}

export type List = ItemList[];

export interface CategoryInfo {
  id: string;
  name: string;
  list: List;
}
