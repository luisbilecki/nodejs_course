module.exports = function(application) {
	application.get('/', function(req, res) {
		/*
		res.format({
			html: function() {
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: function() {				
				res.json({
					body: 'Bem vindo a sua app NodeJS!'
				});
			},
		});
		*/

		res.render('xyz');
	});

	application.post('/', function(req, res){
		const dados = req.body;
		res.send(dados);
	});
}