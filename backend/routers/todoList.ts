import express from 'express';
import { jsonParser } from '../server';
import { getAllTodoLists } from '../helpers/getAllTodoLists';

import {dbCollection} from "../utils/database";

const router = express.Router();

router.post('/todoList', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todolist").insertOne({...req.body});
    const response = await getAllTodoLists();
    res.json(response);
})

router.get('/todoList', async (req: express.Request, res: express.Response)  => {
    const response = await getAllTodoLists();
    res.json(response);
})

module.exports = router;
