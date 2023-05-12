const { MongoClient } = require("mongodb");

const MONGODB_URI = "mongodb://mongo";

let db


MongoClient.connect(MONGODB_URI)
    .then(client => {
        db = client.db();
    })
    .catch(err=> {
        console.log(err);
        throw err;
    })


exports.dbCollection = (...args) => {
    return db.collection(...args)
};

