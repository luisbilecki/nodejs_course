const mongodb = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectId;

// TODO: env
const dbName = 'instagram';
const mongoURL = 'mongodb://localhost:27017/' + dbName;
  
const query = (db, data) => {
  const collection = db.collection(data.collection);

  switch (data.operation) {
    case 'update':
      collection.updateOne(data.where, data.set, data.callback);
      break;
    case 'insert':
      collection.insertOne(data.reqData, data.callback);
      break;
    case 'find':
      collection.find(data.reqData).toArray(data.callback);
      break;
    case 'delete':
      data.where._id = objectID(data.where._id);
      collection.remove(data.where, data.callback);
      break;
  }
}

const connMongoDB = (data) => {
  mongodb.connect(mongoURL, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    query(db, data);
    client.close();
  });
}

module.exports = {
  connMongoDB
}
