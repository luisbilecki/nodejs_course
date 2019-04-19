const express = require('express'),
  bodyParser = require('body-parser');

const { connMongoDB } = require('./db');

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
