// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        title: {
            type:     String,
            maxlength: 30,
            required: true,
        },
        description: {
            type:     String,
            maxlength: 250,
            required: true,
        },
        order: {
            type:     Number,
            min:      0,
            required: true,
        },
        availability: [
            {
                type: String,
                enum: [ 'standard', 'select', 'premium' ],
            },
        ],
        content: {
            videos: [
                {
                    title: {
                        type: String,
                        maxlength: 30,
                    },
                    order: {
                        type:     Number,
                        min:      0,
                    },
                    uri:   {
                        type: String,
                        validate: {
                            validator(value) {
                                const pattern = new RegExp('^(https?:\/\/)?'+ // protocol
                                    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
                                    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
                                    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
                                    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
                                    '(\#[-a-z\d_]*)?$','i'); // fragment locater

                                if (pattern.test(value)) {
                                    return true;
                                }

                                return false;
                            },
                            message(props) {
                                const { value } = props;
                                return `Uri: '${value}' is not valid`;
                            },
                        }
                    },
                },
            ],
            keynotes: [
                {
                    title: String,
                    order: {
                        type:     Number,
                        min:      0,
                    },
                    uri:   {
                        type: String,
                        validate: {
                            validator(value) {
                                const pattern = new RegExp('^(https?:\/\/)?'+ // protocol
                                    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
                                    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
                                    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
                                    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
                                    '(\#[-a-z\d_]*)?$','i'); // fragment locater

                                if (pattern.test(value)) {
                                    return true;
                                }

                                return false;
                            },
                            message(props) {
                                const { value } = props;
                                return `Uri: '${value}' is not valid`;
                            },
                        }
                    },
                },
            ],
        },
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);

schema.index({ order: 1 }, { name: 'order' });

export const lessons = mongoose.model('lessons', schema);

lessons.createIndexes();
