const express = require('express');

const router = express.Router()

const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const { default: mongoose } = require('mongoose');

module.exports = router;

//Product
router.post('/product/add', async (req, res) => {
    const data = new productModel({
        title: req.body.title,
        description: req.body.description,
        category_id: mongoose.Types.ObjectId(req.body.category_id)
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json({messege: `${data.title} has been added successfully`})
    }
    catch(err){
        res.status(400).json({message: err.message})
    }

})


router.get('/product/list', async (req, res) => {
    try{
        const data = await productModel.find();
        res.json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})


router.get('/product/details/:id', async (req, res) => {
    try{
        const data = await productModel.findById(req.params.id).populate({ path: "category_id", select: "title" });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


router.patch('/product/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await productModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json({messege: "Successfully Updated Product!"})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})


router.delete('/product/remove/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productModel.findByIdAndDelete(id)
        res.json({messege: `${data.title} has been deleted successfully`})
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong!" })
    }

})



//Category
router.get('/category/list', async (req, res) => {
    try{
        const data = await categoryModel.find();
        res.json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})

router.post('/category/add', async (req, res) => {
    const data = new categoryModel({
        title: req.body.title
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json({messege: `${data.title} has been added successfully`})
    }
    catch(err){
        res.status(400).json({message: err.message})
    }

});


router.patch('/category/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await categoryModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json({messege: "Successfully Updated Category!"})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})


router.get('/category/details/:id', async (req, res) => {
    try{
        const data = await categoryModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})


router.delete('/category/remove/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await categoryModel.findByIdAndDelete(id)
        res.json({messege: `${data.title} has been deleted successfully`})
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong!" })
    }

})