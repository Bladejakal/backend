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
}
