// Usuarios de prueba
var users = {admin: {id: 1, nombre: 'Administrador', pass: 'admin'},
	fran: {id: 2, nombre: 'Fran', pass: '1234'}};

// Realiza la autenticación del usuario validando sus credenciales
exports.autenticar = function (login, pass, callback) {
	if (users[login] && users[login].pass === pass) {
		callback(null, users[login]);
	} else {
		callback(new Error('Usuario y contraseña incorrectos'));
	}
};