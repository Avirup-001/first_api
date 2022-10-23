const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

module.exports = mongoose.model('Product', productSchema)