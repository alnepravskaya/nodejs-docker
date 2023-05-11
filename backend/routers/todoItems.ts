const express = require('express');
const router = express.Router();
import * as express from 'express';
const { dbCollection} = require("../util/database");
const {jsonParser} = require("../server");
const {getAllTodoLists} = require("../helpers/getAllTodoLists");


router.post('/updateItem', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todolist").updateOne({id: req.body.id}, [{$set: {"list": req.body.list}}]);
    const response = await getAllTodoLists();
    res.json(response);
})

router.post('/addNewItem', jsonParser, async (req: express.Request, res: express.Response)=> {
    await dbCollection("todolist").updateOne({id: req.body.id}, [{$set: {list: {$concatArrays: ["$list", req.body.list]}}}])
    const response = await getAllTodoLists();
    res.json(response);
})

module.exports = router;
