// Retrieve
var mongoose = require('mongoose');

//DB setup
mongoose.connect(
  'mongodb://mongo:27017',
  {
    useNewUrlParser: true
  }
);
const db = mongoose.connection;
module.exports = class Database {
  constructor() {
    console.log('new db!', !!db);
  }

  find() {
    const collection = db.collection('cars');
    console.log('wtf', collection);
    return collection.find({}).toArray();
  }
  create(data) {
    const collection = db.collection('cars');
    return collection.insert(data);
  }
};
