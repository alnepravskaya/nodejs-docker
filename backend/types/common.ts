export interface ItemList {
    id: string;
    text: string;
    isDone: boolean;
    level: ItemListLevel;
}

export type List = ItemList[];

export interface CategoryInfo {
    id: string;
    name: string;
    list: List;
}

enum ItemListLevel {
    "level-0",
    "level-1",
    "level-2",
    "level-3",
    "level-4"
}
