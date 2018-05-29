let mysql = require('mysql');

let mysqlConnection = function() {
  console.log('DB connection established!');
  
  return mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'portal_noticias'
  });
}  

module.exports = function() {
  console.log('Consign loads the db connection module');
  return mysqlConnection;
}
