import {Category, List} from "../types/common";

export const todoService = {
    getAllLists: async(): Promise<Category[]> => {
      const data =   await  fetch("http://localhost:8000/todoList", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return  await data.json();
    },
    addNewList: async(value: string): Promise<Category[]> => {
        const data =   await  fetch("http://localhost:8000/todoList", {
            method: "post",
            body: JSON.stringify({id: String(new Date()), name: value, list: []}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
        return  await data.json();
    },
    addNewItem: async(id: string, value: string): Promise<Category[]> => {
        const data =   await fetch("http://localhost:8000/addNewItem", {
            method: "post",
            body: JSON.stringify({
                id: id, list: [{
                    id: String(new Date()),
                    text: value,
                    isDone: false
                }]
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        return  await data.json();
    },
    updateItem: async(id: string, list: List): Promise<Category[]> => {
        const data =   await   fetch("http://localhost:8000/updateItem", {
            method: "post",
            body: JSON.stringify({id, list}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        return  await data.json();
    },
}
