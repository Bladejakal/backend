import { Lessons as LessonsModel } from '../models';

export class Lessons {
    // data ← req.body
    constructor(data) {
        this.models = {
            lessons: new LessonsModel(data),
        };
    }

    async create() {
        const data = await this.models.lessons.create();

        return data;
    }

    async get() {
        const data = await this.models.lessons.get();

        return data;
    }

    async getByHash(lessonsHash) {
        const data = await this.models.lessons.getByHash(lessonsHash);

        return data;
    }

    async updateByHash(lessonsHash) {
        const data = await this.models.lessons.updateByHash(lessonsHash);

        return data;
    }

    async deleteByHash(lessonsHash) {
        const data = await this.models.lessons.deleteByHash(lessonsHash);

        return data;
    }

    async addVideo(lessonsHash) {
        const data = await this.models.lessons.addVideo(lessonsHash);

        return data;
    }

    async addKeynote(lessonsHash) {
        const data = await this.models.lessons.addKeynote(lessonsHash);

        return data;
    }

    async getVideoByHash(lessonHash, videoHash) {
        const data = await this.models.lessons.getVideoByHash(lessonHash, videoHash);

        return data;
    }

    async getKeynoteByHash(lessonHash, keynoteHash) {
        const data = await this.models.lessons.getKeynoteByHash(lessonHash, keynoteHash);

        return data;
    }

    async removeVideoByHash(lessonHash, videoHash) {
        const data = await this.models.lessons.removeVideoByHash(lessonHash, videoHash);

        return data;
    }

    async removeKeynoteByHash(lessonHash, keynoteHash) {
        const data = await this.models.lessons.removeKeynoteByHash(lessonHash, keynoteHash);

        return data;
    }
}
