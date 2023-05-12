import { Category, List } from '../types/common';
import { v4 as uuidv4 } from 'uuid';

export const todoService = {
  getAllLists: async (): Promise<Category[]> => {
    const data = await fetch(`http://localhost:8000/todoList`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return await data.json();
  },
  addNewList: async (value: string): Promise<Category[]> => {
    const data = await fetch('http://localhost:8000/todoList', {
      method: 'post',
      body: JSON.stringify({ id: uuidv4(), name: value, list: [] }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return await data.json();
  },
  addNewItem: async (id: string, value: string): Promise<Category[]> => {
    const data = await fetch('http://localhost:8000/addNewItem', {
      method: 'post',
      body: JSON.stringify({
        id,
        list: [
          {
            id: uuidv4(),
            text: value,
            isDone: false
          }
        ]
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    return await data.json();
  },
  updateItem: async (id: string, list: List): Promise<Category[]> => {
    const data = await fetch('http://localhost:8000/updateItem', {
      method: 'post',
      body: JSON.stringify({ id, list }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    return await data.json();
  }
};
