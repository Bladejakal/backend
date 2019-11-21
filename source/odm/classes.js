import mongoose from 'mongoose';

const classesSchema = new mongoose.Schema({
    title:       String,
    description: String,
    hash:        String,
    students: [
        {
            user:     mongoose.Schema.Types.ObjectId,
            status:   String,
            expelled: Boolean,
            notes:    String
        }
    ],
    lessons:  [
        {
            lesson:    mongoose.Schema.Types.ObjectId,
            scheduled: Date,
        }
    ],
    duration: {
        started: Date,
        closed:  Date
    },
    order:    Number,
    created:  Date,
    modified: Date
});

const classes = mongoose.model('classes', classesSchema);

export { classes };
