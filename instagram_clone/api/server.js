const express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = 8080;

app.listen(port);

console.log('Server listening on ' + port);