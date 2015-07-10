// Se importan los modelos de datos
var models = require('../models/models.js');

// Controlador para el GET /quizes/question
exports.question = function(req, res) {
	// Se realiza una búsqueda en Base de Datos.
	models.Quiz.findAll().then(function (resultado) {
		//res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?'});
		res.render('quizes/question', {pregunta: resultado[0].pregunta});
	});
};

// Controlador para el GET /quizes/answer
exports.answer = function(req, res) {
	// Se realiza una búsqueda en Base de Datos.
	models.Quiz.findAll().then(function (resultado) {
		// var resultado = req.query.respuesta === 'Roma' ? 'Correcto' : 'Incorrecto';
		var resultado = req.query.respuesta === resultado[0].respuesta ? 'Correcto' : 'Incorrecto';
		res.render('quizes/answer', {respuesta: resultado});
	});
};

// Controlador para el GET /author
exports.author = function(req, res) {
	res.render('author', {autor: 'Francisco Luis Paredes Parejo'});
};