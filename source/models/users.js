import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await users.create(this.data);

        return data;
    }

    async get() {
        const data = await users.find();

        return data;
    }

    async getByHash(userHash) {
        const data = await users.findOne({ hash: userHash });

        return data;
    }

    async updateByHash(userHash) {
        const data = await users.findOneAndUpdate({ hash: userHash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(userHash) {
        const data = await users.findOneAndDelete({ hash: userHash });

        return data;
    }
}
