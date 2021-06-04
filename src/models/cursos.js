const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const CursosSchema = new Schema ({

	NombreCurso : {
		type : String,
		required : true
		
	}, 

	Duracion : {
		type : String,
		required : true
		
	}, 

	Costo : {
		type: Number,
		required : true,
		
	},

	ID : {
		type: Number,
		required : true
		
	}

});

const Cursos = mongoose.model('Cursos', CursosSchema); 

module.exports = Cursos