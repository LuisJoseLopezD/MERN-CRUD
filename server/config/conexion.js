const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crudmern');

const objetodb = mongoose.connection;

objetodb.on('connected', ()=>{
    console.log("correct conection to mongodb...")
})

objetodb.on('error', ()=>{
    console.log("error to connect to mongodb...")
})

module.exports = mongoose;
