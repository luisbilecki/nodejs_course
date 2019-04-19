const express = require('express'),
  bodyParser = require('body-parser'),
  multiparty = require('connect-multiparty'),
  fs = require('fs');

const { connMongoDB } = require('./db');
const objectID = require('mongodb').ObjectId;

const { isEmpty } = require('lodash');
const boom = require('boom');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(multiparty());

const port = 8080;

app.listen(port); 

console.log('Server listening on ' + port);

// CORS
const cors = require('cors');
app.use(cors({
  origin: '*', // In production we should change this to frontend url
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true,
}));

// GET (hello)
app.get('/', (req, res) => {
    res.send({ msg: 'hello' });
})

// POST (create)
app.post('/api', (req, res) => {
  const imgTs = new Date().getTime();
  const imgUrl = `${imgTs}_${req.files.arquivo.originalFilename}`;
  const originPath = req.files.arquivo.path;
  const destinationPath = `./uploads/${imgUrl}`;

  fs.rename(originPath, destinationPath, (err) => {
    if(err){
        res.status(500).json({ error : err });
        return;
    }

    const dataToInsert = {
        url_imagem: imgUrl,
        titulo: req.body.titulo
    }

    connMongoDB({
      operation: 'insert',
      reqData: dataToInsert,
      collection: 'posts',
      callback: (err, records) => {
        if (err) {
          res.json({ status: 'erroed', err });
        } else {
          res.json({ status: 'posts inserted successfully' });
        }
      }
    });
  });
});

app.get('/api/imagens/:imagem', (req, res) => {
  const img = req.params.imagem;

  fs.readFile('./uploads/' + img, (err, content) => {
    if (err) {
      const boomifiedErr = boom.badRequest(err).output;
      res.status(boomifiedErr.statusCode);
      res.json(boomifiedErr.payload);
      
      return;
    }

    res.writeHead(200, { 'content-type' : 'image/jpg' });
    res.end(content);
  });
});

// GET (find)
app.get('/api', (req, res) => {
  connMongoDB({
    operation: 'find',
    reqData: {},
    collection: 'posts',
    callback: (err, records) => {
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
    callback: (err, records) => {
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
    set: { 
      $push: { 
        comentarios: {
          id_comentario: new objectID(),
          comentario: req.body.comentario,
          ts: new Date().getTime(),
        }
      }
    },
    collection: 'posts',
    callback: (err, records) => {
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
    callback: (err) => {
      if (err) {
        res.json({ status: 'erroed', err });
      } else {
        res.status(204);
        res.json({ status: 'post deleted successfully' });
      }
    }
  });
});
