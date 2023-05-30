import express from 'express';
import {getCategory} from '../helpers/getCategories';
import {dbCollection} from '../utils/database';
import {TODO_CATEGORIES} from '../contants/constants';

export const router = express.Router();

router.post('/updateList', async (req: express.Request, res: express.Response) => {
    const {categoryId, updatedList} = req.body;

    await dbCollection(TODO_CATEGORIES).updateOne({id: categoryId}, [
        {$set: {list: updatedList}}
    ]);
    res.json({status: 200, message: "List updated"});
});

