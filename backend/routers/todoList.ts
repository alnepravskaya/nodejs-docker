
import * as express from 'express';

const express = require('express');
const router = express.Router();
const {dbCollection} = require("../util/database");
const {jsonParser} = require("../server");
const {getAllTodoLists} = require("../helpers/getAllTodoLists");


router.post('/todoList', jsonParser,async (req: express.Request, res: express.Response) => {
    await dbCollection("todolist").insertOne({...req.body});
    const response = await getAllTodoLists();
    res.json(response);
})

router.get('/todoList', async (req: express.Request, res: express.Response)  => {
    const response = await getAllTodoLists();
    res.json(response);
})

module.exports = router;
