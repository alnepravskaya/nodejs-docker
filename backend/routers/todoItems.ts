import express from 'express';
import {getAllTodoLists} from '../helpers/getAllTodoLists';
import {jsonParser} from '../server';
import {dbCollection} from '../utils/database';

const router = express.Router();

router.post('/updateItem', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todolist").updateOne({id: req.body.id}, [{$set: {"list": req.body.list}}]);
    const response = await getAllTodoLists();
    res.json(response);
})

router.post('/addNewItem', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todolist").updateOne({id: req.body.id}, [{$set: {list: {$concatArrays: ["$list", req.body.list]}}}])
    const response = await getAllTodoLists();
    res.json(response);
})

module.exports = router;
