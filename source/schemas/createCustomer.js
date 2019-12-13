export const createCustomer = {
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
        country: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
        disabled: {
            type: 'boolean',
        },
    },
    required:             [ 'name', 'email', 'phone', 'password', 'country', 'city' ],
    additionalProperties: false,
};
