// Controlador para el GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: '¿Cuál es la capital de Italia?'});
};

// Controlador para el GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = req.query.respuesta === 'Roma' ? 'Correcto' : 'Incorrecto';
	res.render('quizes/answer', {respuesta: resultado});
};

// Controlador para el GET /author
exports.author = function(req, res) {
	res.render('author', {autor: 'Francisco Luis Paredes Parejo'});
};