// Core
import mongoose from 'mongoose';

// Instruments
import { customers, products } from './';

const schema = new mongoose.Schema({
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:  customers,
    },
    pid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:  products,
    },
    count: {
        type:     Number,
        required: true,
    },
    comment: {
        type: String,
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const orders = mongoose.model('orders', schema);
