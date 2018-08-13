const cadastro = (app, req, res) => {
  res.render('cadastro', { validacao: {}, dadosForm: {} });
};

const cadastrar = (app, req, res) => {    
  const dadosForm = req.body;

  req.assert('nome', 'Nome não pode ser vazio').notEmpty();
  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
  req.assert('senha', 'Senha não pode ser vazia').notEmpty();
  req.assert('casa', 'Casa não pode ser vazia').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
      res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
      return;
  }

  res.send('podemos cadastrar');
}
module.exports = { 
  cadastro,
  cadastrar 
};