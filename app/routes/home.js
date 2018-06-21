module.exports = function(app){
  app.get('/', function(req, res){
    appliction.app.controllers.home.index(appliction, req, res);
  });
}