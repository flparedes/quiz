var express = require('express');
var router = express.Router();

// Controlador de quizes
var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Carga automática de la pregunta cuando hay un parámetro quizId
router.param('idQuiz', quizController.load);

// GET para /quizes que muestra el listado de preguntas
router.get('/quizes', quizController.index);

// GET para /quizes/idQuiz que muestra el formulario de la pregunta
router.get('/quizes/:idQuiz(\\d+)', quizController.show);

// GET para /quizes/idQuiz/answer que muestra el resultado de la respuesta
router.get('/quizes/:idQuiz(\\d+)/answer', quizController.answer);

// GET para /author
router.get('/author', quizController.author);

module.exports = router;
