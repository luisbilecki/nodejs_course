let express = require('express');
let app = express();

app.get('/', function(req,res) {
  res.send("<html><body>Portal de noticias</body></html>");
});

app.get('/tecnologia', function(req,res) {
  res.send("<html><body>Notícias de tecnologia</body></html>");
});


app.listen(3000, function() {
  console.log("Servidor rodando com Express");
});