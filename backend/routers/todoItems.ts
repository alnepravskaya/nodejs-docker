import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getCategory } from '../helpers/getCategories';
import { dbCollection } from '../utils/database';
import { TODO_CATEGORIES } from '../contants/constants';

export const router = express.Router();

router.post('/updateItem', async (req: express.Request, res: express.Response) => {
  const { categoryId, item } = req.body;
  const categoryInfo = await getCategory(categoryId);
  const itemsIndex = categoryInfo.list.findIndex(({ id }) => id === item.id);
  const updatedList = [...categoryInfo.list];
  updatedList[itemsIndex] = item;

  await dbCollection(TODO_CATEGORIES).updateOne({ id: categoryId }, [
    { $set: { list: updatedList } }
  ]);
  const response = await getCategory(categoryId);
  res.json(response);
});

router.delete('/removeItem', async (req: express.Request, res: express.Response) => {
  const { categoryId, id: itemId } = req.body;
  const categoryInfo = await getCategory(categoryId);
  const updatedList = categoryInfo.list.filter(({ id }) => id !== itemId);

  await dbCollection(TODO_CATEGORIES).updateOne({ id: categoryId }, [
    { $set: { list: updatedList } }
  ]);
  const response = await getCategory(categoryId);
  res.json(response);
});

router.post('/addNewItem', async (req: express.Request, res: express.Response) => {
  await dbCollection(TODO_CATEGORIES).updateOne({ id: req.body.id }, [
    {
      $set: {
        list: {
          $concatArrays: [
            '$list',
            [
              {
                id: uuidv4(),
                text: req.body.value,
                isDone: false
              }
            ]
          ]
        }
      }
    }
  ]);
  const response = await getCategory(req.body.id);
  res.json(response);
});
