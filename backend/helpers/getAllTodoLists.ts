const {dbCollection} = require("../util/database");

exports.getAllTodoLists = async () => {
    const response = await dbCollection("todolist").find().toArray();
    return response;
}

