// Se importan los modelos de datos
var models = require('../models/models.js');

var temas = [
  'Humanidades', 'Ocio', 'Ciencia', 'Tecnología', 'Otro'
];

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
		res.render('quizes/index', {preguntas: quizes, errors: []});
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
		res.render('quizes/index', {preguntas: quizes, errors: []});
	});
};

// Controlador para el GET /quizes/show
exports.show = function(req, res) {
		res.render('quizes/show', {pregunta: req.quiz, temas: temas, errors: []});
};

// Controlador para el GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = req.query.respuesta === req.quiz.respuesta ? 'Correcto' : 'Incorrecto';
	res.render('quizes/answer', {resultado: resultado, pregunta: req.quiz, errors: []});
};

// Controlador para el GET /author
exports.author = function(req, res) {
	res.render('author', {autor: 'Francisco Luis Paredes Parejo', errors: []});
};

// Controlador para el GET /quizes/new
exports.new = function (req, res) {
	var quiz = models.Quiz.build(
		// Crea un objeto quiz
		{pregunta: 'pregunta', respuesta: 'respuesta', tematica: 'tematica'}
	);

	res.render('quizes/new', {quiz: quiz, temas: temas, errors: []});
}

// Controlador para el POST /quizes/create
exports.create = function(req, res) {
	// Se crea un objeto quiz con los datos del formulario
	var quiz = models.Quiz.build(req.body.quiz);

	// Se validan los campos antes de guardar los datos
	quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/new', {quiz: quiz, temas: temas, errors: err.errors});
		} else {
			// Se guarda en la BD los datos del objeto quiz
			quiz.save({
				// Se guardan sólo los campos pregunta y respuesta
				fields: ['pregunta', 'respuesta', 'tematica']
			}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
}

// Controlador para el GET /quizes/:id/edit
exports.edit = function (req, res) {
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz: quiz, temas: temas, errors: []});
}

// Controlador para el POST /quizes/:id/update
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	// Se validan los campos antes de guardar los datos
	req.quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/edit', {quiz: req.quiz, temas: temas, errors: err.errors});
		} else {
			// Se guarda en la BD los datos del objeto quiz
			req.quiz.save({
				// Se guardan sólo los campos pregunta y respuesta
				fields: ['pregunta', 'respuesta', 'tematica']
			}).then(function() {
				res.redirect('/quizes');
			});
		}
	});
}

// Controlador para el DELETE /quizes/:id
exports.destroy = function(req, res) {
	
	req.quiz.destroy().then(function(err) {
		res.redirect('/quizes');
	}).catch(function(error) {
		next(error);
	});
}