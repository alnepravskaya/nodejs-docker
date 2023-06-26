export interface ItemList {
  id: string
  text: string
  isDone: boolean
  level: 0 | 1 | 2 | 3 | 4
}

export type List = ItemList[]

export interface Category {
  id: string
  name: string
}

export interface CategoryInfo {
  id: string
  name: string
  list: List
}
