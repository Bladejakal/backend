import { lessons } from '../odm';

export class Lessons {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await lessons.create(this.data);

        return data;
    }

    async get() {
        const data = await lessons.find();

        return data;
    }

    async getByHash(lessonHash) {
        const data = await lessons.findOne({ hash: lessonHash });

        return data;
    }

    async updateByHash(lessonHash) {
        console.log(lessonHash);
        const data = await lessons.findOneAndUpdate({ hash: lessonHash }, this.data, { new: true });

        return data;
    }

    async deleteByHash(lessonHash) {
        const data = await lessons.findOneAndDelete({ hash: lessonHash });

        return data;
    }

    async addVideo(lessonHash) {
        const data = await lessons.findOneAndUpdate(
            { hash: lessonHash },
            { "$push": { "content.videos": this.data } },
            { new: true });

        return data;
    }

    async addKeynote(lessonHash) {
        const data = await lessons.findOneAndUpdate(
            { hash: lessonHash },
            { "$push": { "content.keynotes": this.data } },
            { new: true });

        return data;
    }

    async getVideoByHash(lessonHash, videoHash) {
        const data = await lessons
            .findOne({ hash: lessonHash, "content.videos.hash": videoHash })
            .select("content.videos.$");

        return data;
    }

    async getKeynoteByHash(lessonHash, keynoteHash) {
        const data = await lessons
            .findOne({ hash: lessonHash, "content.keynotes.hash": keynoteHash })
            .select("content.keynotes.$");

        return data;
    }

    async removeVideoByHash(lessonHash, videoHash) {
        const data = await lessons.findOneAndUpdate(
            { hash: lessonHash },
            { "$pull": { "content.videos": { hash: videoHash } } },
            { new: true });

        return data;
    }

    async removeKeynoteByHash(lessonHash, keynoteHash) {
        const data = await lessons.findOneAndUpdate(
            { hash: lessonHash },
            { "$pull": { "content.keynotes": { hash: keynoteHash } } },
            { new: true });

        return data;
    }
}
