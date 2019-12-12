// Core
import bcrypt from 'bcryptjs';

// Instruments
import { users } from '../odm';

export class Auth {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const header = this.data;
        const [ , auth ] = header.split(' ');
        const [ userEmail, plainPassword ] = Buffer.from(auth, 'base64').toString()
            .split(':');

        const data = await users
            .findOne({ 'emails.email': userEmail })
            .select('password emails roles hash')
            .lean();

        if (!data) {
            throw new Error('no user found');
        }

        const result = await bcrypt.compare(plainPassword, data.password);

        if (!result) {
            throw new Error('credentials not valid');
        }

        const { __t, hash, emails } = data;

        return { __t, hash, emails };
    }
}
