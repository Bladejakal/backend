// Instruments
import { Classes as ClassesModel } from '../models';

export class Classes {
    constructor(data) {
        this.models = {
            classes: new ClassesModel(data),
        };
    }

    async create() {
        const data = await this.models.classes.create();

        return data;
    }

    async getAll() {
        const data = await this.models.classes.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.classes.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.classes.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.classes.removeByHash();

        return data;
    }

    async enroll() {
        const data = await this.models.classes.enroll();

        return data;
    }

    async expel() {
        const data = await this.models.classes.expel();

        return data;
    }
}
