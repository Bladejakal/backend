export const createProduct = {
    type:       'object',
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        price: {
            type:    'number',
            minimum: 0,
        },
        discount: {
            type:    'number',
            minimum: 0,
            maximum: 50,
        },
        total: {
            type: 'number',
        },
    },
    required:             [ 'title', 'description', 'price', 'discount', 'total' ],
    additionalProperties: false,
};
