import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { hash } = await products.create(this.data);

        return { hash };
    }

    async get() {
        const data = await products
            .find()
            .select('-__v -_id -total -created -modified -hash')
            .lean();

        return data;
    }

    async getByHash(hash) {
        const data = await products
            .findOne({ hash: hash })
            .select('-__v -_id -total -created -modified -hash')
            .lean();

        return data;
    }

    async updateByHash(hash) {
        const data = await products.findOneAndUpdate({ hash: hash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(hash) {
        const data = await products.findOneAndDelete({ hash: hash });

        return data;
    }

    async findById(id) {
        const data = await products.findById(id);

        return data;
    }

    async updateById(id, updateData) {
        const data = await products.findByIdAndUpdate(id, updateData);

        return data;
    }
}

