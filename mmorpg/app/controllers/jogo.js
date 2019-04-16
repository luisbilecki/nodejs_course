const jogo = (app, req, res) => {
  if(!req.session.autorizado) {
    res.send('Usuário precisa fazer login');
    return;
  }

  const msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
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
	if (!req.session.autorizado) {
		res.send('Usuário precisa fazer login');
		return;	
	}

	res.render("aldeoes", {validacao: {}});
}

const pergaminhos = (app, req, res) => {  
	if (!req.session.autorizado) {
		res.send('Usuário precisa fazer login');
		return;	
	}

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	const usuario = req.session.usuario;

	JogoDAO.getAcoes(usuario, res);
}

const ordenar_acao_sudito = (app, req, res) => {  
	if (req.session.autorizado !== true) {
		res.send('Usuário precisa fazer login');
		return;	
	}
	
	const dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	const erros = req.validationErrors();

	if (erros) {
		res.redirect('jogo?msg=A');
		return;
	}

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;
	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=B');
};

const revogar_acao = (app, req, res) => {
  const { id_acao } = req.query;

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.revogarAcao(id_acao, res);
};

module.exports = { 
  jogo,
  sair,
  suditos,
  pergaminhos,
  ordenar_acao_sudito,
  revogar_acao,
};