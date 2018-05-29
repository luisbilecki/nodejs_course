module.exports = function(app){
  app.get('/noticia', function(req,res){
      var connection = app.config.dbConnection();

      connection.query("SELECT * FROM noticias WHERE id_noticia = 1", function(error, result){
          res.render('noticias/noticia', { noticia : result });
      });

  });
}