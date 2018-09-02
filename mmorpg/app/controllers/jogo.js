const jogo = (app, req, res) => {
  if(req.session.autorizado) {
    res.render('jogo');
  } else{
    res.send('Usuário precisa fazer login');
  }
};

const sair = (app, req, res) => {
  req.session.destroy(function(err){
    res.render('index', { validacao: {} });
  });
};

module.exports = { 
  jogo,
  sair,
};