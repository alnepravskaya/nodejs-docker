const express = require('express')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');

exports.jsonParser = bodyParser.json()

console.log('server is up!')

const todoListRoutes = require('../routers/todoList');
const todoItemsRoutes = require('../routers/todoItems');

app.use(todoListRoutes);
app.use(todoItemsRoutes);

app.listen(8000);

