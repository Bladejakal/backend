// Core
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        first: {
            type:     String,
            required: true,
        },
        last: {
            type:     String,
            required: true,
        },
    },
    emails: [
        {
            email: {
                type:     String,
                unique:   true,
                required: true,
                validate: {
                    validator(value) {
                        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                            return true;
                        }

                        return false;
                    },
                    message(props) {
                        const { value } = props;

                        return `Email: '${value}' is not valid`;
                    },
                },
            },
            primary: {
                type:    Boolean,
                default: () => false,
            },
        },
    ],
    phones: [
        {
            phone: {
                type:     String,
                required: true,
            },
            primary: {
                type:    Boolean,
                default: () => false,
            },
        },
    ],
    password: {
        type:     String,
        select:   false,
        required: true,
    },
    disabled: {
        type:    Boolean,
        default: () => false,
    },
    fullName: {
        type:    String,
        virtual: true,
        get() {
            return `${this.name.first} ${this.name.last}`;
        },
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }, toJSON: { getters: true, virtuals: false } });

schema.index({ 'name.first': 1, 'name.last': 1 }, { name: 'flName' });
schema.index({ city: 'text', country: 'text', 'name.first': 'text', 'name.last': 'text' });

export const users = mongoose.model('users', schema);

users.createIndexes();
