const app = require('./config/server');

let server = app.listen(8000, () => {
    console.log('Servidor online');
})

let io = require('socket.io').listen(server);;

io.on('connection', (socket) => {
    console.log('Usuário conectou');

    socket.on('disconnect', () => {
        console.log('Usuário desconectou');
    });
});