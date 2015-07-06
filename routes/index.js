var express = require('express');
var router = express.Router();

// Controlador de quizes
var quizController = require('../controllers/quiz_controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET para /quizes/question
router.get('/quizes/question', quizController.question);

// GET para /quizes/answer
router.get('/quizes/answer', quizController.answer);

// GET para /author
router.get('/author', quizController.author);

module.exports = router;
