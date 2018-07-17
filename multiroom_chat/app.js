const app = require("./config/server");

let server = app.listen(8080, () => {
  console.log("Servidor online");
});

let io = require("socket.io").listen(server);

app.set("io", io);

io.on("connection", socket => {
  console.log("Usuário conectou");

  socket.on("disconnect", () => {
    console.log("Usuário desconectou");
  });

  socket.on("msgParaServidor", data => {
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });
    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit("participantesParaCliente", { apelido: data.apelido });
      socket.broadcast.emit("participantesParaCliente", {
        apelido: data.apelido
      });
    }
  });
});
