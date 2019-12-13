import { Orders as OrdersModel, Products as ProductsModel, Customers as CustomersModel } from '../models';

export class Orders {
    constructor(data) {
        this.models = {
            orders:    new OrdersModel(data),
            products:  new ProductsModel(),
            customers: new CustomersModel(),
        };

        this.data = data;
    }

    async create() {
        const { uid, pid, count } = this.data;

        // check if customer exists
        try {
            await this.models.customers.findById(uid);
        } catch (error) {
            throw new Error(`Publisher with id: ${uid} wasn't found`);
        }

        let product = null;

        // check if product exists
        try {
            product = await this.models.products.findById(pid);
        } catch (error) {
            throw new Error(`Product with id: ${pid} wasn't found`);
        }

        const { total } = product;

        // check if enough products
        if (count > total) {
            throw new Error(`Can't order ${count} items. ${total} items left`);
        }

        const data = await this.models.orders.create();

        // decrease amount of items in the product
        await this.models.products.updateById(pid, { total: total - count });

        return data;
    }

    async get() {
        const data = await this.models.orders.get();

        return data;
    }

    async getByHash(hash) {
        const data = await this.models.orders.getByHash(hash);

        return data;
    }

    async updateByHash(hash) {
        const data = await this.models.orders.updateByHash(hash);

        return data;
    }

    async deleteByHash(hash) {
        const data = await this.models.orders.deleteByHash(hash);

        return data;
    }
}
