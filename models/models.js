// Aquí se define y configura el modelo de datos del proyecto
var path = require('path');

// Cargar ORM Sequelize
var Sequelize = require('sequelize');

// Configura la BBDD SQLite
var sequelize = new Sequelize(null, null, null,
	{dialect: 'sqlite', storage: 'quiz.sqlite'});

// Se importan las definiciones de tablas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Se exporta las definiciones de tablas
exports.Quiz = Quiz;

// Se crean e inicializan las tablas
sequelize.sync().then(function() {
	// then se encarga de ejecutar el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		// Se comprueba si está vacía antes de inicializarla
		if (count === 0) {
			Quiz.create({
				pregunta: '¿Cuál es la capital de Italia?',
				respuesta: 'Roma'
			})
			// A continuación mostramos un mensaje indicando el estado de la inicialización
			.then(function() {
				console.log('Tabla Quiz inicializada correctamente');
			});
		}
	});
});