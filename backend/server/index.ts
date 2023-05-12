import express from "express";
import * as bodyParser from "body-parser";

const app = express();
export const jsonParser = bodyParser.json()

console.log('server is up!')

const todoListRoutes = require('../routers/todoList');
const todoItemsRoutes = require('../routers/todoItems');

app.use(todoListRoutes);
app.use(todoItemsRoutes);

app.listen(8000);

