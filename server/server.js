const express = require("express");
const app = express();

//importar conexion mongodb
const archivoDB = require('./config/conexion');

//rutas
app.get('/',(req, res) => {
    res.end('Bievenidos al servidor')
})

//config server
app.listen(5000, function(){
    console.log("el servidor NODE está corriendo");
})
