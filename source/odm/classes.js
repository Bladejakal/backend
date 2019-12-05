// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

// Instruments
import { users, lessons } from './';

const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        title: {
            type: String,
            maxlength: 30,
        },
        description: {
            type:     String,
            maxlength: 250,
        },
        students:    [
            {
                user: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  users,

                },
                status: {
                    type: String,
                    enum: [ 'standard', 'select', 'premium' ],
                },
                expelled: Boolean,
                notes: {
                    type: String,
                    maxlength: 250,
                },
            },
        ],
        lessons: [
            {
                lesson: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref:  lessons,
                },
                scheduled: Date,
            },
        ],
        duration: {
            started: {
                type:     Date,
                required() {
                    if (this.started > this.closed) {
                        return true;
                    }

                    return false;
                }
            },
            closed: {
                type:     Date,
                required: true,
            },
        },
        order: {
            type: Number,
            min: 0
        },
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

schema.path('students.user').validate(async function(value) {
    const data = await users.findOne({ hash: value });

    if (!data) {
        throw new Error(
            `User with hash ${value} wasn't found in the users collection`,
        );
    }

    return true;
});

schema.path('lessons.lesson').validate(async function(value) {
    const data = await lessons.findOne({ hash: value });

    if (!data) {
        throw new Error(
            `Lesson with hash ${value} wasn't found in the lessons collection`,
        );
    }

    return true;
});

schema.index({ title: 'text', description: 'text' });
schema.index({ order: 1 }, { name: 'order' });

export const classes = mongoose.model('classes', schema);

classes.createIndexes();
