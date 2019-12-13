import { ValidationError } from '../errors';

export const getDbCredentials = () => {
    const { DB_USER, DB_PASSWORD } = process.env;

    if (!DB_USER) {
        throw new ValidationError('Environment variable DB_USER should be specified');
    }
    if (!DB_PASSWORD) {
        throw new ValidationError('Environment variable DB_PASSWORD should be specified');
    }

    return { DB_USER, DB_PASSWORD };
};
