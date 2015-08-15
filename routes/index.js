var express = require('express');
var router = express.Router();

// Controladores
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

// RUTAS PARA QUIZ
// Carga automática de la pregunta para los parámetros idQuiz e idComment
router.param('idQuiz', quizController.load);
router.param('idComment', commentController.load);

// RUTAS PARA SESSION
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// GET para /quizes que muestra el listado de preguntas
router.get('/quizes', quizController.index);

// GET para /quizes/idQuiz que muestra el formulario de la pregunta
router.get('/quizes/:idQuiz(\\d+)', quizController.show);

// GET para /quizes/idQuiz/answer que muestra el resultado de la respuesta
router.get('/quizes/:idQuiz(\\d+)/answer', quizController.answer);

// GET para /author
router.get('/author', quizController.author);

// Rutas para la creación de preguntas
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

// Rutas para la edición de preguntas
router.get('/quizes/:idQuiz(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:idQuiz(\\d+)', sessionController.loginRequired, quizController.update);

// Rutas para el borrado de preguntas
router.delete('/quizes/:idQuiz(\\d+)', sessionController.loginRequired, quizController.destroy);

// RUTAS PARA COMMENT
router.get('/quizes/:idQuiz(\\d+)/comments/new', commentController.new);
router.post('/quizes/:idQuiz(\\d+)/comments', commentController.create);
router.get('/quizes/:idQuiz(\\d+)/comments/:idComment(\\d+)/publish', sessionController.loginRequired, commentController.publish);

module.exports = router;
