const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let mongodb;

function getMongoConnection() {
  if (!mongodb) {
    mongodb = new Promise((resolve, reject) => {
      MongoClient.connect(
        process.env.MONGODB_URL,
        {
          poolSize: 10,
          autoReconnect: true,
          reconnectTries: 60,
          reconnectInterval: 1000
        },
        (err, client) => {
          if (err) {
            console.log('Error connecting to MongoDB');
            console.log(err);
            reject(err);
          } else {
            console.log('Connected to MongoDB');
            resolve(client.db(process.env.MONGODB_DATABASE));
          }
        }
      );
    });
  }
  return mongodb;
}

function listTodos() {
  return getMongoConnection()
    .then(db => db.collection('todos'))
    .then(col => col.find().toArray());
}

function getTodoById(id) {
  return getMongoConnection()
    .then(db => db.collection('todos'))
    .then(col => col.findOne({ _id: new ObjectID(id) }));
}

function createTodo(todo) {
  return getMongoConnection()
    .then(db => db.collection('todos'))
    .then(col =>
      col.insertOne({
        title: todo.title,
        status: todo.status === true ? true : false
      })
    )
    .then(r => r.ops[0]);
}

function deleteTodo(id) {
  return getMongoConnection()
    .then(db => db.collection('todos'))
    .then(col => col.findOneAndDelete({ _id: new ObjectID(id) }));
}

function updateTodo(id, todo) {
  return getMongoConnection()
    .then(db => db.collection('todos'))
    .then(col =>
      col.findOneAndUpdate(
        { _id: new ObjectID(id) },
        {
          title: todo.title,
          status: todo.status === true ? true : false
        },
        {
          returnOriginal: false
        }
      )
    )
    .then(r => r.value);
}

module.exports = {
  listTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo
};
