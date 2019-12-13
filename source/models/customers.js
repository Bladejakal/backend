// Core
import bcrypt from 'bcryptjs';

// Instruments
import { customers } from '../odm';
import { NotFoundError } from '../helpers';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const user = await this._transformCreateCustomer(this.data);

        const { hash }  = await customers.create(user);

        return { hash };
    }

    async get() {
        const data = await customers
            .find()
            .select('-__v -_id -__t -city -country -disabled -created -modified -hash -emails.hash -emails._id -phones.hash -phones._id')
            .lean();

        return data;
    }

    async getByHash(hash) {
        const data = await customers
            .findOne({ hash })
            .select('-__v -_id -__t -city -country -disabled -created -modified -hash -emails.hash -emails._id -phones.hash -phones._id')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async updateByHash(hash) {
        const data = await customers.findOneAndUpdate({ hash: hash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(hash) {
        const data = await customers.findOneAndDelete({ hash: hash });

        return data;
    }

    async findById(id) {
        const data = await customers.findById(id);

        return data;
    }

    async _transformCreateCustomer(data) {
        const { name, email, phone, city, country, password } = data;

        const hashedPassword = await bcrypt.hash(password, 11);
        const [ first, last ] = name.split(' ');

        const user = {
            name: {
                first,
                last,
            },
            emails:   [{ email, primary: true }],
            phones:   [{ phone, primary: true }],
            city,
            country,
            password: hashedPassword,
        };

        return user;
    }
}
