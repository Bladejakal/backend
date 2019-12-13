// Core
import mongoose from 'mongoose';

// parent model
import { users } from './users';

// child scheme
const schema = new mongoose.Schema({
    role: {
        type:     String,
        required: true,
    },
});

export const staff = users.discriminator(
    'staff',
    schema,
);
