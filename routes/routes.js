const express = require('express');

const router = express.Router()

const Model = require('../models/model');

module.exports = router;

//Add Method
router.post('/add', async (req, res) => {
    const data = new Model({
        title: req.body.title
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json({messege: `${data.title} has been added successfully`})
    }
    catch(err){
        res.status(400).json({message: error.message})
    }

})

//List all Method
router.get('/list', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})

//Get by ID Method
router.get('/get/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json({messege: "Successfully Updated!"})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//Delete by ID Method
router.delete('/remove/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.json({messege: `${data.title} has been deleted successfully`})
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong!" })
    }

})