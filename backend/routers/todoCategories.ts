import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getAllTodoCategories, getCategory } from '../helpers/getCategories';
import { dbCollection } from '../utils/database';
import { TODO_CATEGORIES } from '../contants/constants';

export const router = express.Router();

router.post('/todoCategories', async (req: express.Request, res: express.Response) => {
  const newCategoryId = uuidv4();
  await dbCollection(TODO_CATEGORIES).insertOne({
    id: newCategoryId,
    name: req.body.name,
    list: []
  });
  const response = await getAllTodoCategories();
  res.json({ status: 200, body: response });
});

router.post('/todoCategories/update', async (req: express.Request, res: express.Response) => {
  await dbCollection(TODO_CATEGORIES).updateOne({ id: req.body.id }, [
    { $set: { name: req.body.name } }
  ]);
  const response = await getAllTodoCategories();
  res.json({ status: 200, body: response });
});

router.delete(
  '/todoCategories/:categoryId',
  async (req: express.Request, res: express.Response) => {
    await dbCollection(TODO_CATEGORIES).deleteOne({ id: req.params.categoryId });
    const response = await getAllTodoCategories();
    res.json({ status: 200, body: response });
  }
);

router.get('/todoCategories/:categoryId', async (req: express.Request, res: express.Response) => {
  const response = await getCategory(req.params.categoryId);
  res.json(response);
});

router.get('/todoCategories', async (req: express.Request, res: express.Response) => {
  const response = await getAllTodoCategories();
  res.json(response);
});
