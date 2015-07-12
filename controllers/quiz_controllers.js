// Se importan los modelos de datos
var models = require('../models/models.js');

// Controlador para la carga de preguntas
exports.load = function(req, res, next, quizId) {
	// Se realiza una búsqueda en Base de Datos.
	models.Quiz.findById(quizId).then(function (quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error("No existe la pregunta con el id=" + quizId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// Controlador para el GET /quizes
exports.index = function(req, res) {
	var search = req.query.search;

	if (search) {
		buscarConSearch(req, res, search);
	} else {
		buscarTodos(req, res);
	}
};

// Función para la búsqueda sin parámetros en search
function buscarTodos(req, res) {
	// Se realiza una búsqueda en Base de Datos.
	models.Quiz.findAll().then(function (quizes) {
		//res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?'});
		res.render('quizes/index', {preguntas: quizes});
	});
}

// Función para la búsqueda con parámetros en search
function buscarConSearch(req, res, search) {
	// Se reemplazan los espacios en blanco por %
	search = search.replace(/ /g, "%");

	models.Quiz.findAll({
		where: {
			pregunta: {
				$like: '%' + search + '%'
			}
		}
	}).then(function (quizes) {
		res.render('quizes/index', {preguntas: quizes});
	});
};

// Controlador para el GET /quizes/show
exports.show = function(req, res) {
		res.render('quizes/show', {pregunta: req.quiz});
};

// Controlador para el GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = req.query.respuesta === req.quiz.respuesta ? 'Correcto' : 'Incorrecto';
	res.render('quizes/answer', {resultado: resultado, pregunta: req.quiz});
};

// Controlador para el GET /author
exports.author = function(req, res) {
	res.render('author', {autor: 'Francisco Luis Paredes Parejo'});
};