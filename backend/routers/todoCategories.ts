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

router.post('/todoCategories/update', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todoCategories").updateOne({id: req.body.id}, [{$set: {"name": req.body.name}}]);
    const response = await getAllTodoCategories();
    res.json(response);
})

router.delete('/todoCategories/:categoryId', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todoCategories").deleteOne({id: req.params.categoryId});
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
