import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {getCategory} from '../helpers/getCategories';
import {jsonParser} from '../server';
import {dbCollection} from '../utils/database';

const router = express.Router();

router.post('/updateItem', jsonParser, async (req: express.Request, res: express.Response) => {
    const {categoryId, item} = req.body
    const categoryInfo = await getCategory(categoryId);
    const itemsIndex = categoryInfo.list.findIndex(({ id }) => id === item.id);
    const updatedList = [...categoryInfo.list];
    updatedList[itemsIndex] = item;

    await dbCollection("todoCategories").updateOne({id: categoryId}, [{$set: {"list": updatedList}}]);
    const response = await getCategory(categoryId);
    res.json(response);
})

router.post('/removeItem', jsonParser, async (req: express.Request, res: express.Response) => {
    const {categoryId, id:itemId} = req.body
    const categoryInfo = await getCategory(categoryId);
    const updatedList = categoryInfo.list.filter(({ id }) => id !== itemId);

    await dbCollection("todoCategories").updateOne({id: categoryId}, [{$set: {"list": updatedList}}]);
    const response = await getCategory(categoryId);
    res.json(response);
})

router.post('/addNewItem', jsonParser, async (req: express.Request, res: express.Response) => {
    await dbCollection("todoCategories").updateOne({id: req.body.id}, [{
        $set: {
            list: {
                $concatArrays: ["$list", [{
                    id: uuidv4(),
                    text: req.body.value,
                    isDone: false
                }]]
            }
        }
    }])
    const response = await getCategory(req.body.id);
    res.json(response);
})

module.exports = router;
