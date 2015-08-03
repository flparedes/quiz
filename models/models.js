// Aquí se define y configura el modelo de datos del proyecto
var path = require('path');

var url = process.env.DATABASE_URL || 'sqlite://:@:/';

// Se extrae de la cadena de conexión de la BD los parámetros de la misma.
// Postgres DATABASE_URL = postgres://user:pass@host:port/database
// SQLite 	DATABASE_URL = sqlite://:@:/
var urlParams = url.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (urlParams[6] || null);
var user      = (urlParams[2] || null);
var pass      = (urlParams[3] || null);
var protocol  = (urlParams[1] || null);
var dialect   = (urlParams[1] || null);
var port      = (urlParams[5] || null);
var host      = (urlParams[4] || null);
var storage   = process.env.DATABASE_STORAGE || 'quiz.sqlite';

// Cargar ORM Sequelize
var Sequelize = require('sequelize');

// Configura la BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pass,
	{dialect:  dialect,
	 protocol: protocol,
	 port:     port,
	 host:     host, 
	 storage:  storage,	// Sólo para SQLite en fichero .env
	 omitNull: true 	// Sólo para Postgres
	});

// Se importan las definiciones de tablas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Se indican las relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Se exporta las definiciones de tablas
exports.Quiz = Quiz;
exports.Comment = Comment;

// Se crean e inicializan las tablas
sequelize.sync().then(function() {
	// then se encarga de ejecutar el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		// Se comprueba si está vacía antes de inicializarla
		if (count === 0) {Quiz.create({
				pregunta: '¿Cuál es la capital de Italia?',
				respuesta: 'Roma'
			});
			Quiz.create({
				pregunta: '¿Cuál es la capital de Portugal?',
				respuesta: 'Lisboa'
			})
			// A continuación mostramos un mensaje indicando el estado de la inicialización
			.then(function() {
				console.log('Tabla Quiz inicializada correctamente');
			});
		}
	});
});