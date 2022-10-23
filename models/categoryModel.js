const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    }
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

module.exports = mongoose.model('Category', categorySchema)