const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)