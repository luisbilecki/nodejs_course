const iniciaChat = (app, req, res) => {
  let formData = req.body;
  
  req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
  req.assert('apelido', 'Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3,15);

  let errors = req.validationErrors();

  if(errors){
      res.render("index", { validacao : errors });
      return;
  }

  app.get('io').emit(
    'msgParaCliente',
    {
      apelido: formData.apelido,
      mensagem: ' acabou de entrar no chat!'
    }
  )

  res.render('chat');
};

module.exports = {
  iniciaChat
};