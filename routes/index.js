var express = require('express');
var router = express.Router();

// Controladores
var quizController = require('../controllers/quiz_controllers');
var commentController = require('../controllers/comment_controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

// RUTAS PARA QUIZ
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

// Rutas para la creación de preguntas
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

// Rutas para la edición de preguntas
router.get('/quizes/:idQuiz(\\d+)/edit', quizController.edit);
router.put('/quizes/:idQuiz(\\d+)', quizController.update);

// Rutas para el borrado de preguntas
router.delete('/quizes/:idQuiz(\\d+)', quizController.destroy);

// RUTAS PARA COMMENT
router.get('/quizes/:idQuiz(\\d+)/comments/new', commentController.new);
router.post('/quizes/:idQuiz(\\d+)/comments', commentController.create);

module.exports = router;
