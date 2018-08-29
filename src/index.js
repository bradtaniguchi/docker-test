const express = require('express');
const Database = require('./database');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const db = new Database();
app.get('/', (req, res) => {
  res.send('Hello world :D\n');
});
app.get('/list', () => {
  const items = db.find();
  res.send(items);
});

app.get('/add', (req, res) => {
  const data = {
    date: new Date(),
    name: 'someName'
  };
  const items = db.create(data).then(result => {
    res.send(result);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
