let app = require('./config/server')

app.get('/', function(req,res) {
  res.render("home/index");
});

app.get('/formulario-inclusao-noticia', function(req,res) {
  res.render("admin/form_add_noticia");
});

app.get('/noticias', function(req,res) {
  res.render("noticias/noticias");
});

app.get('/noticia', function(req,res) {
  res.render("noticias/noticia");
});

app.listen(3000, function() {
  console.log("Servidor rodando com Express");
});