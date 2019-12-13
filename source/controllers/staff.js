import { Staff as StaffModel } from '../models';

export class Staff {
    constructor(data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async create() {
        const data = await this.models.staff.create();

        return data;
    }

    async get() {
        const data = await this.models.staff.get();

        return data;
    }
}
