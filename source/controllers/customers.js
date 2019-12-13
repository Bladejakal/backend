import { Customers as CustomerModel } from '../models';

export class Customers {
    constructor(data) {
        this.models = {
            customer: new CustomerModel(data),
        };
    }

    async create() {
        const data = await this.models.customer.create();

        return data;
    }

    async get() {
        const data = await this.models.customer.get();

        return data;
    }

    async getByHash(hash) {
        const data = await this.models.customer.getByHash(hash);

        return data;
    }

    async updateByHash(hash) {
        const data = await this.models.customer.updateByHash(hash);

        return data;
    }

    async deleteByHash(hash) {
        const data = await this.models.customer.deleteByHash(hash);

        return data;
    }
}
