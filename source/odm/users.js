import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    phones: [
        {
            phone: String,
            primary: Boolean
        }
    ],
    emails: [
        {
            email: String,
            primary: Boolean
        }
    ],
    password: String,
    sex: String,
    roles: [{
        type: String
    }],
    social: {
        facebook: String,
        linkedin: String,
        github: String,
        skype: String
    },
    notes: String,
    hash: String,
    disabled: Boolean,
    created: Date,
    modified: Date
});

const users = mongoose.model('users', userSchema);

export {users};
