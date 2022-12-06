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

//add product
router.post('/addproduct',(req,res) => {
    const newUser = new userModel({
        id: req.body.id,
        name: req.body.name,
        stock: req.body.stock
    })
    newUser.save(function(err){
        if (!err){
            res.send("product added!!")
        } else {
            res.send(err);
        }
    })
})

//get products
router.get('/getproducts',(req,res) => {
    userModel.find({},function(docs,err){
        if (!err){
            res.send(docs)
        } else {
            res.send(err);
        }
    })
})

//edit product
router.post('/editproduct',(req,res) => {
    userModel.findOneAndUpdate({id:req.body.id},{
        name: req.body.name,
        stock: req.body.stock
    }, (err) => {
        if (!err){
            res.send('Product updated!!')
        } else {
            res.send(err);
        }
    })
})

//delete product
router.post('/deleteproduct',(req,res) => {
    userModel.findOneAndDelete({id:req.body.id}, (err) => {
        if (!err){
            res.send('Product deleted!!')
        } else {
            res.send(err);
        }
    })
})


module.exports = router;