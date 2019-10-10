class Validator {
    constructor() {
        this.rules = {
            'name': {
                type: 'object',
                nonEmpty: true,
                fields: {
                    first: {
                        type: 'string'
                    },
                    last: {
                        type: 'string'
                    }
                }

            },
            'phone': {
                type: 'string'
            },
            'address': {
                type: 'object',
                nonEmpty: true,
                fields: {
                    'zip': {
                        type: 'string'
                    },
                    'city': {
                        type: 'string'
                    },
                    'country': {
                        type: 'string'
                    },
                    'street': {
                        type: 'string'
                    }
                }
            },
            'email': {
                'type': 'string'
            }
        };
    }

    check(object, rules = this.rules) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                if (rules.hasOwnProperty(key)) {
                    if (rules[key].type === 'object') {
                        return this.check(object[key], rules[key].fields)
                    }

                    if (typeof object[key] !== rules[key].type) {
                        return (`Error: Wrong filter parameter: ${key}`)
                    }

                    if (object[key] === '') {
                        return `Field ${key} should be non-empty string`;
                    }
                } else {
                    return (`Error: Wrong filter parameter: ${key}`);
                }
            }
        }

        return false;
    }
}

module.exports = Validator;
