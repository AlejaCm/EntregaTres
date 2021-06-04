const express = require('express')
const app = express()
const path = require ('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./../helpers/helpers')

//Path
const dirPublic = path.join(__dirname, "../../public")
const dirViews = path.join(__dirname, "../../template/views")
const dirPartials = path.join(__dirname, '../../template/partials')
const Curso = require('../models/cursos')
const Estudiante = require('../models/Estudiantes')

//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)


//Paginas
app.get('/', function (req, res){
	res.render('index',{
		titulo: 'Inicio'
	})
})

app.post('/eliminar',function(req,res){
	Curso.deleteOne({_id : req.body.NombreCurso},(err,resultado)=>{
		if (err){
			return console.log(err)
		}
		Curso.find({}, (err,resul)=>{
		if (err){
			return console.log(err)
		}
		console.log(resul)
		res.render('cursos',{
	    titulo: 'Cursos',
	    res: resul ,
	    mensaje: 'Se ha eliminado con exito'
		})
	})
        
		
	})
})

app.get('/cursos', function (req, res){
	Curso.find({}, (err,resultado)=>{
		if (err){
			return console.log(err)
		}
		res.render('cursos',{
	    titulo: 'Cursos',
	    res: resultado
		})
	})
})

app.post('/cursos', function(req, res){
	res.render('cursos2', {
		titulo: 'Ver Cursos',
		NombreCurso: req.body.NombreCurso,
		Duracion: req.body.Duracion,
		Costo: req.body.Costo
	
	
	})

}); 

app.get('/registrar', function (req, res){
	res.render('registrar', {
		titulo: 'Registrar'

	})
})

app.post('/registrar', function(req, res){
	console.log('ingresa')
	let cursos = new Curso ({
		NombreCurso: req.body.NombreCurso,
		Duracion: req.body.Duracion,
		Costo: req.body.Costo,
		ID: req.body.ID
	})

	cursos.save ((err, resultado)=>{
		if (err){
			return (err)
		}
		console.log("Ingreso el nuevo registro")
		res.render('registrar',{
		titulo: 'Registrar nuevo curso',
		mensaje: `<div class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Creado con exito</strong> 
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div> `
	   })

	})

})

app.get('/inscribir', function(req, res){
	Curso.find({}, (err,resultado)=>{
		if (err){
			return console.log(err)
		}
		res.render('inscribir',{
	    titulo: 'Inscripciones',
	    res: resultado
		})
	})
})

app.post('/inscribir', function(req, res){
	let Estudiantes = new Estudiante ({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		correo: req.body.correo,
		cursos: [req.body.id],
		usuario : req.body.usuario,
		contrasena : req.body.contrasena
	})
     console.log("Registrado" + Estudiantes)
	Estudiantes.save((err, resul)=>{
		console.log("Ingreso1" + resul)
		if (err){
			return (err)
		}
		console.log("Termino")
		Curso.find({}, (err,resultado)=>{
			console.log("Ingreso" + resultado)
		if (err){
			return console.log(err)
		}
		res.render('inscribir',{
	    titulo: 'Inscripciones',
	    res: resultado ,
	    mensaje: `<div class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Se ha registrado con exito!</strong> 
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div> `
		})
	})

	})
	
})



app.get('/ListaInscripciones', function(req, res){
	Curso.find({}, (err,resultado)=>{
		if (err){
			return console.log(err)
		}
		res.render('ListaInscripciones',{
	    titulo: 'Lista Inscripciones',
	    res: resultado
		})
	})
})

app.post('/ListaInscripciones', function(req, res){
	Estudiante.find({cursos: [req.body.id]}, (err,resultado)=>{
		if (err){
			return console.log(err)
		}
		console.log(resultado, req.body.id)
	res.render('ListaInscripciones', {
		titulo: 'Lista De Inscripciones',
		Estudiantes : resultado,
		ID: req.body.ID
	})
})
})

app.get('/login', function (req, res){
	res.render('login',{
		titulo: 'Inicio Sesion'
	})
})

app.post('/login', function (req, res){
	res.render('login',{
		titulo: 'Inicio Sesion'
	})
})

//error 404
app.get('*',function (req,res){
	res.render('error',{
		titulo:'Error 404'

	})
})

module.exports = app