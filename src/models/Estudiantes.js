const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const EstudiantesSchema = new Schema ({

	nombre : {
		type : String,
		required : true
		
	}, 

	apellido : {
		type : String,
		required : true
		
	}, 

	correo : {
		type: String,
		required : true,
		
	},

	usuario : {
		type : String,
		required : true
		
	}, 

	contrasena : {
		type : String,
		required : true
		
	},

	cursos : [{
		type : Schema.Types.ObjectId,
		required : true
		
	}]

});

const Estudiante = mongoose.model('Estudiante', EstudiantesSchema); 

module.exports = Estudiante