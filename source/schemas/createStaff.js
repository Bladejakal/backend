export const createStaff = {
    type:       'object',
    properties: {
        name: {
            type: 'string',
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        role: {
            type: 'string',
        },
        disabled: {
            type: 'boolean',
        },
    },
    required:             [ 'name', 'email', 'phone', 'role' ],
    additionalProperties: false,
};
