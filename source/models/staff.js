// Core
import bcrypt from 'bcryptjs';

import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreateStaff(this.data);
        const { hash } = await staff.create(user);

        return { hash };
    }

    async get() {
        const data = await staff.find()
            .find()
            .select('-__v -_id -__t -disabled -created -modified -hash -emails.hash -emails._id -phones.hash -phones._id')
            .lean();

        return data;
    }

    async _transformCreateStaff(data) {
        const { name, email, phone, role, password } = data;

        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');

        const user = {
            name: {
                first,
                last,
            },
            emails:   [{ email, primary: true }],
            role:     role,
            phones:   [{ phone, primary: true }],
            password: hashedPassword,
        };

        return user;
    }
}
