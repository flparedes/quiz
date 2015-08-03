// Se importan los modelos de datos
var models = require('../models/models.js');

// Controlador para el GET /quizes/:idQuiz(\\d+)/comments/new
exports.new = function (req, res) {
	
	res.render('comments/new', {quizId: req.params.idQuiz, errors: []});
}

// Controlador para el POST /quizes/:idQuiz(\\d+)/comments
exports.create = function(req, res) {
	// Se crea un objeto comment con los datos del formulario
	var comment = models.Comment.build(
		{
			comentario: req.body.comment.texto,
			QuizId: req.params.idQuiz
		});

	// Se validan los campos antes de guardar los datos
	comment.validate().then(function(err) {
		if (err) {
			res.render('comments/new', {comment: comment, quizId: req.params.idQuiz, errors: err.errors});
		} else {
			// Se guarda en la BD los datos del objeto
			comment.save().then(function() {
				res.redirect('/quizes/' + req.params.idQuiz);
			});
		}
	}).catch(function(error) {next(error)});
}