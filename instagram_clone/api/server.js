const express = require('express'),
  bodyParser = require('body-parser');

const { connMongoDB } = require('./db');
const objectID = require('mongodb').ObjectId;

const { isEmpty } = require('lodash');
const boom = require('boom');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = 8080;

app.listen(port); 

console.log('Server listening on ' + port);

// GET (hello)
app.get('/', (req, res) => {
    res.send({ msg: 'hello' });
})

// POST (create)
app.post('/api', (req, res) => {
  const bodyData = req.body;

  connMongoDB({
    operation: 'insert',
    reqData: bodyData,
    collection: 'posts',
    callback: function(err, records){
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        res.json({ status: 'posts inserted successfully' });
      }
    }
  });
});

// GET (find)
app.get('/api', (req, res) => {
  connMongoDB({
    operation: 'find',
    reqData: {},
    collection: 'posts',
    callback: function(err, records){
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        res.status(200);
        res.json({ posts: records });
      }
    }
  });
});

// GET By id
app.get('/api/:id', (req, res) => {
  connMongoDB({
    operation: 'find',
    reqData: objectID(req.params.id),
    collection: 'posts',
    callback: function(err, records){
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        if (isEmpty(records)) {
          const err = boom.notFound('could not find!').output;
          res.status(err.statusCode);
          res.json(err.payload);

          return;
        }

        res.json(records);
      }
    }
  });
});

// PUT By id
app.put('/api/:id', (req, res) => {
  connMongoDB({
    operation: 'update',
    where: { _id: objectID(req.params.id) },
    set: { $set: { titulo: req.body.titulo }},
    collection: 'posts',
    callback: function(err, records){
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        res.json({ status: 'post updated successfully' });
      }
    }
  });
});

// DELETE By id
app.delete('/api/:id', (req, res) => {
  connMongoDB({
    operation: 'delete',
    where: { _id: req.params.id },
    collection: 'posts',
    callback: function(err){
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        res.status(204);
        res.json({ status: 'post deleted successfully' });
      }
    }
  });
});
