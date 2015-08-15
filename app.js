var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var debug = require('debug')('quiz:server');

// Importar express-session para la gestión de las sesiones
var session = require('express-session');

// Importar express-partial como marco de decoración
var partials = require('express-partials');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Utilizar partials para la decoración de páginas
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Se añade una semilla para el cifrado de la cookie
app.use(cookieParser('Quiz-2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinámicos
app.use(function(req, res, next) {
  //Guardar el path en session.redir para la redirección tras el login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }
  
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

// Control de inactividad
app.use(function(req, res, next) {
  // Se comprueba que el usuario esté logado
  if (req.session.user) {
		// Se recupera la hora actual y la anterior
    var date = new Date().getTime();
    var dateAnt = req.session.ultimaPeticion || date;
    
    // Se guarda la hora de la última petición
    req.session.ultimaPeticion = date;
    
    // Si la fecha anterior más 2 minutos es menor que la actual ha caducado la sesión
    if ((dateAnt + 120000) < date) {
      delete req.session.user;
      res.render('session/caducada', {errors: []});
    } else {
      next();
    }
	} else {
    next();
  }
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
