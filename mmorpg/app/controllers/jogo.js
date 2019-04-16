const jogo = (app, req, res) => {
  if(!req.session.autorizado) {
    res.send('Usuário precisa fazer login');
    return;
  }

  const { usuario, casa } = req.session;

  const connection = application.config.dbConnection;
  const JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa);
};

const sair = (app, req, res) => {
  req.session.destroy(function(err){
    res.render('index', { validacao: {} });
  });
};

const suditos = (app, req, res) => {
  res.render('aldeoes', { validacao: {} });
}

const pergaminhos = (app, req, res) => {
  res.render('pergaminhos', { validacao: {} });
}
module.exports = { 
  jogo,
  sair,
  suditos,
  pergaminhos,
};