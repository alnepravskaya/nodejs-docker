import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

console.log('server is up!');

import { router as todoListRoutes } from '../routers/todoCategories';
import { router as todoItemsRoutes } from '../routers/todoItems';

app.use(bodyParser.json());

app.use(todoListRoutes);
app.use(todoItemsRoutes);

app.listen(8000);
