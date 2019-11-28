import { Users as UsersModel } from '../models';

export class Users {
    // data ← req.body
    constructor(data) {
        this.models = {
            users: new UsersModel(data),
        };
    }

    async create() {
        const data = await this.models.users.create();

        return data;
    }

    async get() {
        const data = await this.models.users.get();

        return data;
    }

    async getByHash(userHash) {
        const data = await this.models.users.getByHash(userHash);

        return data;
    }

    async updateByHash(userHash) {
        const data = await this.models.users.updateByHash(userHash);

        return data;
    }

    async deleteByHash(userHash) {
        const data = await this.models.users.deleteByHash(userHash);

        return data;
    }
}
