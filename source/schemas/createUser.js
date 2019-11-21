export const createUser = {
    type: 'object',
    properties: {
        name: {
            type: 'object',
            properties: {
                first: {
                    type: 'string',
                    minLength: 3,
                },
                last: {
                    type: 'string',
                    minLength: 3,
                }
            }
        },
        password: {
            type: 'string',
        },
        sex: {
            type: 'string',
            enum: ['f', 'm'],
        },
    },
    required: ['name', 'password', 'sex'],
    additionalProperties: false,
};
