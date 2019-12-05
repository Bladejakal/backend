// Instruments
import { classes, users } from '../odm';
import { validatePaginationObj, NotFoundError } from '../utils';

export class Classes {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const data = await classes.create(this.data);

        return data;
    }

    async getAll() {
        const { page: oPage, size: oSize } = this.data;

        const { page, size } = validatePaginationObj({
            page: oPage,
            size: oSize,
        });

        const total = await classes.countDocuments();
        const offset = (page - 1) * size;

        const data = await classes
            .find({})
            .populate('students.user', '-_id -__v')
            .populate('lessons.lesson', '-_id -__v')
            .sort('-created')
            .skip(offset)
            .limit(size)
            .select('-__v -id')
            .lean();

        return {
            data,
            meta: {
                total,
                page,
                size,
            },
        };
    }

    async getByHash() {
        const { hash } = this.data;

        const data = await classes
            .findOne({ hash })
            .populate('students.user', '-_id -__v')
            .populate('lessons.lesson', '-_id -__v')
            .select('-__v -id')
            .lean();

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async updateByHash() {
        const { hash, payload } = this.data;

        const data = await classes.findOneAndUpdate({ hash }, payload);

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async removeByHash() {
        const { hash } = this.data;

        const data = await classes.findOneAndDelete({ hash });

        if (!data) {
            throw new NotFoundError(`can not find document with hash ${hash}`);
        }

        return data;
    }

    async enroll() {
        const { hash, payload } = this.data;
        const { user, status, notes } = payload;

        const student = await users.findOne({ hash: user });

        if (!student) {
            throw new NotFoundError(`can not find student with hash ${hash}`);
        }

        const { _id } = student;
        const isExists = await classes.findOne({ hash, 'students.user': _id });

        if (isExists) {
            throw new Error(
                `student with hash ${user} already enrolled to the class with hash ${hash}`,
            );
        }

        const enrolledUser = {
            user: _id,
            status,
            notes,
        };

        const data = await classes.findOneAndUpdate(
            { hash },
            { $push: { students: enrolledUser } },
        );

        return data;
    }

    async expel() {
        const { hash, payload } = this.data;
        const { user } = payload;

        const student = await users.findOne({ hash: user });

        if (!student) {
            throw new NotFoundError(`can not find student with hash ${hash}`);
        }

        const { _id } = student;
        const isExists = await classes.findOne({ hash, 'students.user': _id });

        if (!isExists) {
            throw new Error(
                `student with hash ${user} not enrolled to the class with hash ${hash}`,
            );
        }

        const data = await classes.findOneAndUpdate(
            { hash, students: { $elemMatch: { user: _id } } },
            { 'students.$.expelled': true },
        );

        return data;
    }
}
