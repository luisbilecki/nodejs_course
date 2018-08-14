const mongo = require('mongodb');

const connMongoDB = function(){
  const db = new mongo.Db(
    'got',
    new mongo.Server(
      'localhost',
      27017,
      {}
    ),
    {}
  );

  return db;
}

module.exports = function() {
  return connMongoDB;
}