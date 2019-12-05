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
        name: {
            first: {
                type:     String,
                minlength: 2,
                maxlength: 15,
                required: true,
            },
            last: {
                type:     String,
                minlength: 2,
                maxlength: 15,
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
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone: {
                    type:     String,
                    required: true,
                },
                primary: Boolean,
            },
        ],
        password: {
            type:     String,
            select:   false,
            required: true,
        },
        sex: {
            type:     String,
            enum:     [ 'm', 'f' ],
            required: true,
        },
        roles: [
            {
                type:    String,
                default: 'newbie',
                enum:    [ 'newbie', 'student', 'teacher' ],
            },
        ],
        socials: {
            facebook: {
                type: String,
                validate: {
                    validator(value) {
                        if (/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w\-]*)?/.test(value)) {
                            return true;
                        }

                        return false;
                    },
                    message(props) {
                        const { value } = props;
                        return `Facebook link: '${value}' is not valid`;
                    },
                }
            },
            linkedin: {
                type: String,
                validate: {
                    validator(value) {
                        if (/^(?:https?:\/\/)?.*linkedin\.com\/(?:in|company)\/([\w\.\-\_]+)\/?$/.test(value)) {
                            return true;
                        }

                        return false;
                    },
                    message(props) {
                        const { value } = props;
                        return `Linkedin link: '${value}' is not valid`;
                    },
                }
            },
            github:   {
                type: String,
                validate: {
                    validator(value) {
                        if (/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_]+).*$/.test(value)) {
                            return true;
                        }

                        return false;
                    },
                    message(props) {
                        const { value } = props;
                        return `Github link: '${value}' is not valid`;
                    },
                }
            },
            skype:    String,
        },
        notes: {
            type: String,
            maxlength: 250,
        },
        disabled: Boolean,
    },
    { timestamp: { createdAt: 'created', updatedAt: 'modified' } },
);
schema.index({ 'name.first': 1, 'name.last': 1 }, { name: 'flName' });
schema.index({ notes: 'text' }, { name: 'notes' });

export const users = mongoose.model('users', schema);

users.createIndexes();
