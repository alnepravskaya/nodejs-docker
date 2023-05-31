import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.options('*', cors());

console.log('server is up! 2');

import { router as todoCategoryRoutes } from '../routers/todoCategories';
import { router as todoListRoutes } from '../routers/todoList';

app.use(bodyParser.json());

app.use(todoCategoryRoutes);
app.use(todoListRoutes);

app.listen(8000);
