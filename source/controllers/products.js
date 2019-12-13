import { Products as ProductsModel } from '../models';

export class Products {
    constructor(data) {
        this.models = {
            products: new ProductsModel(data),
        };
    }

    async create() {
        const data = await this.models.products.create();

        return data;
    }

    async get() {
        const data = await this.models.products.get();

        return data;
    }

    async getByHash(hash) {
        const data = await this.models.products.getByHash(hash);

        return data;
    }

    async updateByHash(hash) {
        const data = await this.models.products.updateByHash(hash);

        return data;
    }

    async deleteByHash(hash) {
        const data = await this.models.products.deleteByHash(hash);

        return data;
    }
}
