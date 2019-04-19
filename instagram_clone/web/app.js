/* importar as configurações do servidor */
const app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(8000, function(){
	console.log('Servidor online');
})
