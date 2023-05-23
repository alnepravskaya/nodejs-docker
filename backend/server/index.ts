import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors())
app.options('*', cors())

console.log('server is up! 2');

import { router as todoListRoutes } from '../routers/todoCategories';
import { router as todoItemsRoutes } from '../routers/todoItems';

app.use(bodyParser.json());

app.use(todoListRoutes);
app.use(todoItemsRoutes);

app.listen(8000);
