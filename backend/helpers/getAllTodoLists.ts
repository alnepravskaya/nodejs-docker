const {dbCollection} = require("../utils/database");

export const getAllTodoLists = async () => {
    const response = await dbCollection("todolist").find().toArray();
    return response;
}

