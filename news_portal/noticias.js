let http = require('http');

let server = http.createServer( function(req, res) {
  let category = req.url;

  switch (category) {
    case '/tecnologia': res.end("<html><body>Notícias de Tecnologia</body></html>");break;
    case '/moda': res.end("<html><body>Notícias de Moda</body></html>");break;
    case '/beleza': res.end("<html><body>Notícias de Beleza</body></html>");break;
    default: res.end("<html><body>Portal de notícias</body></html>");
  }
  
}); 

server.listen(3000);