const index = (application, req, res) => {
  res.render('index', { validacao: {} });
};

const autenticar = (application, req, res) => {    
  const dadosForm = req.body;

  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
  req.assert('senha', 'Senha não pode ser vazia').notEmpty();

  const erros = req.validationErrors();

  if(erros){
      res.render('index', { validacao: erros });
      return;
  }

  const connection = application.config.dbConnection;
  const UsuariosDAO = new application.app.models.UsuariosDAO(connection);

  UsuariosDAO.autenticar(dadosForm, req, res);
}

module.exports = { 
  index,
  autenticar
};