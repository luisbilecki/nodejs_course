const crypto = require('crypto');

function UsuariosDAO(connection){
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = (usuario) => {
  this._connection.open((err, mongoclient) => {
    mongoclient.collection('usuarios', function(err, collection) {      
      const senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');

      usuario.senha = senha_criptografada;

      collection.insert(usuario);
      
      mongoclient.close();
    });
  });
}

UsuariosDAO.prototype.autenticar = (usuario, req, res) => {
  this._connection.open((err, mongoclient) => {
      mongoclient.collection('usuarios', (err, collection) => {
        
        const senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
        usuario.senha = senha_criptografada;

          collection.find(usuario).toArray((err, result) => {              
              if(result[0] != undefined){ 
                  req.session.autorizado = true;

                  req.session.usuario = result[0].usuario;
                  req.session.casa = result[0].casa;
              }

              if(req.session.autorizado){
                  res.redirect('jogo');
              }else{
                  res.render('index', { validacao: {} });
              }

          });
          mongoclient.close();
      });
  });
}

module.exports = function() {
  return UsuariosDAO;
}