const app = require('./config/server');

let server = app.listen(8080, function(){
    console.log('Servidor online');
})

require('socket.io').listen(server);