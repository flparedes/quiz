// MiddleWare de control de acceso para usuarios no logados
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// Get /login --Formulario de login
exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('session/new', {errors: errors});
};

// Controlador para el POST /login -- Autenticación del usuario
exports.create = function(req, res) {
	var login = req.body.login;
	var pass = req.body.pass;

	var userController = require('./user_controller');
	userController.autenticar(login, pass, function(err, user) {
		// Si hay errores se retorna el mensaje de error a la sesión
		if (err) {
			req.session.errors = [{message: 'Se ha producido un error: ' + err}];
			res.redirect('/login');
			return;
		} else {
			// Se crea en sesión el objeto user con los datos del usuario
			req.session.user = {id: user.id, nombre: user.nombre};
			// Se redirecciona a la dirección anterior
			res.redirect(req.session.redir || '/');
		}
	});
};

// Controlador para DESTROY /logout -- Cierre de sesión
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir || '/');
};