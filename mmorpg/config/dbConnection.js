const mongo = require('mongodb');

module.exports = function(){
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