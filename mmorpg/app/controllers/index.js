const index = (application, req, res) => {
  res.render('index');
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

  res.send('tudo ok para criar a sessão');

}

module.exports = { 
  index,
  autenticar
};