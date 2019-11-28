// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    method: {
        type: String
    },
    path: {
        type: String
    },
    duration: {
        start: {
            type: Date
        },
        end: {
            type: Date
        },
    },
    payload: {
        type: Object
    },
    agent: {
        type: String
    },
}, {timestamps: {createdAt: 'created'}, capped: { size: 1024*1024*50 , max: 50000 }});

export const logs = mongoose.model('logs', schema);
