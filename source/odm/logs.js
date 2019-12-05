// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        method: {
            type:     String,
            required: true,
        },
        path: {
            type:     String,
            required: true,
        },
        duration: {
            start: Date,
            end:   Date,
        },
        payload: Object,
        agent:   {
            type:     String,
            required: true,
        },
    },
    {
        timestamp: { createdAt: 'created', updatedAt: false },
        capped:    { size: 50 * 1024 * 1024, max: 50000 },
    },
);

export const logs = mongoose.model('logs', schema);
