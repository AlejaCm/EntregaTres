require('./config');
const express = require('express')
const app = express()
const path = require ('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./helpers/helpers')

//Path
const dirPublic = path.join(__dirname, "../public")
const dirViews = path.join(__dirname, "../template/views")
const dirPartials = path.join(__dirname, '../template/partials')

//Static
app.use(express.static(dirPublic))

//BodyParser
app.use(bodyParser.urlencoded({extended : false}))

//hbs
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials)

app.use(require('./routes/index.js'))

mongoose.connect(process.env.URLDB, {useNewUrlParser: true,  useUnifiedTopology: true}, (err, resultado)=>{
	if (err){
		return console.log(err)
	}
	console.log("conectado")

});


app.listen(process.env.PORT, () => {
	console.log('Servidor en el puerto' + process.env.PORT)
})