const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        category: { type: String, required: true, enum: ['Fruits', 'Vegetables', 'Grocery'] }, // Validate category
        quantity: { type: Number, required: true, min: 1 }, // Minimum quantity validation
        rate: { type: Number, required: true, min: 0.01 }, // Minimum rate validation
        location: { type: String, required: true },
        price: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FormData', FormDataSchema, 'products');
