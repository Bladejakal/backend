import { Classes as ClassesModel } from '../models';

export class Classes {
    // data ← req.body
    constructor(data) {
        this.models = {
            classes: new ClassesModel(data),
        };
    }

    async create() {
        const data = await this.models.classes.create();

        return data;
    }

    async get() {
        const data = await this.models.classes.get();

        return data;
    }

    async getByHash(classesHash) {
        const data = await this.models.classes.getByHash(classesHash);

        return data;
    }

    async updateByHash(classesHash) {
        const data = await this.models.classes.updateByHash(classesHash);

        return data;
    }

    async deleteByHash(classesHash) {
        const data = await this.models.classes.deleteByHash(classesHash);

        return data;
    }

    async enroll(classHash) {
        const data = await this.models.classes.enroll(classHash);

        return data;
    }

    async expel(classHash) {
        const data = await this.models.classes.expel(classHash);

        return data;
    }
}
