// Core
import mongoose from 'mongoose';

// parent model
import { users } from './users';

// child scheme
const schema = new mongoose.Schema({
    city: {
        type:     String,
        required: true,
    },
    country: {
        type:     String,
        required: true,
    },
});

export const customers = users.discriminator(
    'customers',
    schema,
);

schema.index({ city: 'text', country: 'text', 'name.first': 'text', 'name.last': 'text' });

customers.createIndexes();
