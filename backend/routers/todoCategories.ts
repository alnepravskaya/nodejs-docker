import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {jsonParser} from '../server';
import {getAllTodoCategories, getCategory} from '../helpers/getCategories';


import {dbCollection} from "../utils/database";

const router = express.Router();

router.post('/todoCategories', jsonParser, async (req: express.Request, res: express.Response) => {
    const newCategoryId = uuidv4();
    await dbCollection("todoCategories").insertOne({id: newCategoryId, name: req.body.name, list: []});
    const response = await getAllTodoCategories();
    res.json(response);
})

router.get('/todoCategories/:categoryId', async (req: express.Request, res: express.Response)  => {
    const response = await getCategory(req.params.categoryId);
    res.json(response);
})

router.get('/todoCategories', async (req: express.Request, res: express.Response) => {
    const response = await getAllTodoCategories();
    res.json(response);
})

module.exports = router;
