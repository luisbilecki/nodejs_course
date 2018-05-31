module.exports = function(app){
  app.get('/noticia', function(req,res){

      let connection = app.config.dbConnection();
      let noticiasModel = new application.app.models.NoticiasDAO(connection);

      noticiasModel.getNoticia(function(error, result){
          res.render('noticias/noticia', { noticia : result });
      });

  });
}