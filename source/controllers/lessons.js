// Instruments
import { Lessons as LessonsModel } from '../models';

export class Lessons {
    constructor(data) {
        this.models = {
            lessons: new LessonsModel(data),
        };
    }

    async create() {
        const data = await this.models.lessons.create();

        return data;
    }

    async getAll() {
        const data = await this.models.lessons.getAll();

        return data;
    }

    async getByHash() {
        const data = await this.models.lessons.getByHash();

        return data;
    }

    async updateByHash() {
        const data = await this.models.lessons.updateByHash();

        return data;
    }

    async removeByHash() {
        const data = await this.models.lessons.removeByHash();

        return data;
    }

    async addVideo() {
        const data = await this.models.lessons.addVideo();

        return data;
    }

    async addKeynote() {
        const data = await this.models.lessons.addKeynote();

        return data;
    }

    async getVideo() {
        const data = await this.models.lessons.getVideo();

        return data;
    }

    async removeVideo() {
        const data = await this.models.lessons.removeVideo();

        return data;
    }

    async getKeynote() {
        const data = await this.models.lessons.getKeynote();

        return data;
    }

    async removeKeynote() {
        const data = await this.models.lessons.removeKeynote();

        return data;
    }
}
