let mysql = require('mysql');

module.exports = function() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'portal_noticias'
  });
}  
