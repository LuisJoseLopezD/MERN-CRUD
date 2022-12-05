const express = require("express");
const app = express();

//importar conexion mongodb
const archivoDB = require('./config/conexion');

//import de las rutas y modelo usuario
const userRoutes = require('./routes/user.js');

// importar body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/products', userRoutes);

//rutas
app.get('/',(req, res) => {
    res.end('Bievenidos al servidor')
})

//config server
app.listen(5000, function(){
    console.log("el servidor NODE está corriendo");
})
