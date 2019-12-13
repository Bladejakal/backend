import { orders } from '../odm';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { hash } = await orders.create(this.data);

        return { hash };
    }

    async get() {
        const data = await orders
            .find()
            .populate('uid', '-__v -_id -__t -city -country -disabled -created -modified -hash -emails -phones.hash -phones._id')
            .populate('pid', '-_id -__v -description -total -created -modified -hash')
            .sort('-created')
            .select('-__v -id -count -comment -created -modified -hash');

        return data;
    }

    async getByHash(hash) {
        const data = await orders
            .findOne({ hash: hash })
            .populate('uid', '-__v -_id -__t -city -country -disabled -created -modified -hash -emails -phones.hash -phones._id')
            .populate('pid', '-_id -__v -description -total -created -modified -hash')
            .sort('-created')
            .select('-__v -id -count -comment -created -modified -hash');

        return data;
    }

    async updateByHash(hash) {
        const data = await orders.findOneAndUpdate({ hash: hash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(hash) {
        const data = await orders.findOneAndDelete({ hash: hash });

        return data;
    }
}
