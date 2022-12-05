const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const products = mongoose.Schema;

const userSchema = new products({
    id: String,
    name: String,
    stock: Number
});

const userModel = mongoose.model('products', userSchema);

//test
// router.get('/ejemplo',(req,res) => {
//     res.end('Saludos carga desde ruta ejemplo');
// })

//add product
router.post('/addproduct',(req,res) => {
    const newUser = new userModel({
        id: req.body.id,
        name: req.body.name,
        stock: req.body.stock
    })
    newUser.save(function(err){
        if (!err){
            res.send("product added!!!")
        } else {
            res.send(err);
        }
    })
})


module.exports = router;