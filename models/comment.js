// Definición del modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	// Con define se define el nombre de la tabla y sus campos.
	return sequelize.define('Comment',
	{
		comentario: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: 'Cometario vacío'}}
		}
	});
};