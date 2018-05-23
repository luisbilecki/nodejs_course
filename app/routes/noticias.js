module.exports = function(app){
  app.get('/noticias', function(req,res){

      var mysql = require('mysql');

      var connection = mysql.createConnection({
          host: 'localhost',
          user: 'nodejs',
          password: 'nodejs',
          database: 'portal_noticias'
      });

      connection.query("SELECT * FROM noticias", function(error, result){
          res.send(result);
      });

      //res.render('noticias/noticias');
  });
}