import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {getCategory} from '../helpers/getCategories';
import {dbCollection} from '../utils/database';
import {TODO_CATEGORIES} from '../contants/constants';

export const router = express.Router();

router.post('/updateItem', async (req: express.Request, res: express.Response) => {
    const {categoryId, updatedList} = req.body;

    await dbCollection(TODO_CATEGORIES).updateOne({id: categoryId}, [
        {$set: {list: updatedList}}
    ]);
    const response = await getCategory(categoryId);
    res.json(response);
});

router.delete('/removeItem', async (req: express.Request, res: express.Response) => {
    const {categoryId, updatedList} = req.body;

    await dbCollection(TODO_CATEGORIES).updateOne({id: categoryId}, [
        {$set: {list: updatedList}}
    ]);
    const response = await getCategory(categoryId);
    res.json(response);
});

router.post('/addNewItem', async (req: express.Request, res: express.Response) => {
       const {categoryId, updatedList} = req.body;

        await dbCollection(TODO_CATEGORIES).updateOne({id: categoryId}, [
            {$set: {list: updatedList}}
        ]);
        const response = await getCategory(categoryId);
        res.json(response);
});
