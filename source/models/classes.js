import {classes} from '../odm';

export class Classes {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await classes.create(this.data);

        return data;
    }

    async get() {
        const data = await classes.find();

        return data;
    }

    async getByHash(classHash) {
        const data = await classes.findOne({ hash: classHash });

        return data;
    }

    async updateByHash(classHash) {
        const data = await classes.findOneAndUpdate({ hash: classHash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(classHash) {
        const data = await classes.findOneAndDelete({ hash: classHash });

        return data;
    }

    async enroll(classHash) {
        const data = await classes.findOneAndUpdate(
            { hash: classHash },
            { "$push": { "students": this.data } },
            { new: true });

        return data;
    }

    async expel(classHash) {
        const data = await classes.findOneAndUpdate(
            { hash: classHash },
            { "$pull": { "students": { user: this.data.user } } },
            { new: true });

        return data;
    }
}
