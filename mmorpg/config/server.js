const express = require('express'),
	consign = require('consign'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	app = express(),
	expressSession = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSession({
	secret: 'WsBc4sV45kVDywdT',
	resave: false,
	saveUninitialized: false
}));

consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app;