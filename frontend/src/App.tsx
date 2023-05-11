import React, {useEffect, useState} from 'react';
import './App.css';
import Form from "./components/Form/Form";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import ToDoList from "./components/ToDoList/ToDoList";
import {Category, ItemList} from "./types/common";
import Categories from "./components/Categories/Categories";
import {todoService} from "./services/todoService";

function App() {
    const [allLists, setAllList] = useState<Category[]>([]);

    const [selectedListIndex, setSelectedListIndex] = useState(0);

    const getAllLists = async () => {
        const response =  await todoService.getAllLists();
        setAllList(response)
    }

    useEffect(() => {
        void getAllLists();
    }, [])

    const updateSelectedList = (id: string) => {
        const newSelectedListIndex = allLists.findIndex(list => list.id === id);
        setSelectedListIndex(newSelectedListIndex !== -1 ? newSelectedListIndex : 0)
    }


    const addNewList = async (value: string) => {
        const response =  await todoService.addNewList(value);
        setAllList(response)
    }

    const addNewItem = async(value: string) => {
        const response =  await todoService.addNewItem(allLists[selectedListIndex].id, value);
        setAllList(response)
    }

    const updateItemHandler = async (item: ItemList) => {
        const itemsIndex = allLists[selectedListIndex].list.findIndex(({id}) => id === item.id);
        const updatedList = [...allLists[selectedListIndex].list];
        updatedList[itemsIndex] = item;

        const response =  await todoService.updateItem(allLists[selectedListIndex].id, updatedList);
        setAllList(response)
    }

    const removeItemHandler = async (id: string) => {
        const updatedList = allLists[selectedListIndex].list.filter((item) => item.id !== id);

        const response =  await todoService.updateItem(allLists[selectedListIndex].id, updatedList);
        setAllList(response)
    }

    return (
        <div className="app">
            <div className="category-line">
                {!!allLists.length && <Categories options={allLists} updateSelectedList={updateSelectedList}
                                                      selectedListIndex={selectedListIndex}/>}
                <CategoryForm onSubmit={addNewList}></CategoryForm>
            </div>
            <ToDoList list={allLists[selectedListIndex]?.list} onUpdateItem={updateItemHandler}
                      onRemoveItem={removeItemHandler}></ToDoList>
            <Form onSubmit={addNewItem}></Form>

        </div>
    );
}

export default App;
