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
}
