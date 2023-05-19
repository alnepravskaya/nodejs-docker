import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

console.log('server is up!');

const todoListRoutes = require('../routers/todoCategories');
const todoItemsRoutes = require('../routers/todoItems');

app.use(bodyParser.json());

app.use(todoListRoutes);
app.use(todoItemsRoutes);

app.listen(8000);
