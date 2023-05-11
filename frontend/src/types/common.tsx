export type ItemList = {
    id: string,
    text: string,
    isDone: boolean
}

export type List = ItemList[];

export type Category = {
    id: string,
    name: string,
    list: List
}
