// Definición del modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	// Con define se define el nombre de la tabla y sus campos.
	return sequelize.define('Quiz',
	{
		pregunta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: 'Pregunta vacía'}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: 'Respuesta vacía'}}
		},
		tematica: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: 'Selección la temática'}}
		}
	});
};