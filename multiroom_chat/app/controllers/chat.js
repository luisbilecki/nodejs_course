const iniciaChat = (app, req, res) => {
  req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
  req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3,15);

  let errors = req.validationErrors();

  if(errors){
      res.render("index", { validacao : errors });
      return;
  }

  res.render('chat');
};

module.exports = {
  iniciaChat
};