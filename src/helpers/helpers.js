const Curso = require('../models/cursos')
const Estudiante = require('../models/Estudiantes')
const hbs = require('hbs')
hbs.registerHelper('listar', (c) => {
	console.log("prueba" + c)
	texto = "";
	c.forEach(c => {
		texto += `<tr><td> <button type="submit" class='form-control btn btn-danger btn-sm' name='NombreCurso' value='${c._id}'>eliminar</button></td>

		         <td>  ${c.NombreCurso}  </td> 
		         <td>   ${c.Duracion} </td> 
		         <td>   ${c.Costo}  </td> 
		         <td>   ${c.ID}  </td></tr>`
	})
	console.log("Hola" + texto)
	return texto
});

 hbs.registerHelper('MostrarEstudiantes', (Estudiantes) => {
 	if (Estudiantes){ 
 		texto = "";
 	Estudiantes.forEach(Estudiante => {
texto += `<tr>
		  <td>  ${Estudiante.nombre}  </td>
          <td>  ${Estudiante.correo}  </td> 
          <td> <button type="submit" class='form-control btn btn-danger btn-sm' name='NombreEstudiante' value='${Estudiante._id}'>eliminar</button></td>
 		  </tr>`
 	})
 	console.log("Hola" + texto)
 	return texto
 	}
 });