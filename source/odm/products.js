// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type:     String,
        required: true,
    },
    description: {
        type:     String,
        required: true,
    },
    price: {
        type:     Number,
        required: true,
    },
    discount: {
        type:     Number,
        min:      0,
        max:      50,
        required: true,
    },
    total: {
        type:     Number,
        required: true,
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const products = mongoose.model('products', schema);
