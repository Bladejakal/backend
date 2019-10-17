const {validate, validateFields} = require('./');

describe('Testing Validate function', () => {
    test('should exist', () => {
        expect(validate).toBeDefined();
    });

    test('should be a function', () => {
        expect(typeof validate).toBe('function');
    });

    test('payload should be an object', () => {
        expect(() => validate({
            data: {payload: 'not Object'},
            name: 'testName'
        })).toThrowError('testName: payload should be an object');
    });

    test('payload should have required field name', () => {
        expect(() => validate({
            data: {payload: {}},
            name: 'testName'
        })).toThrowError('testName: payload should have required field name');
    });

    test('payload.name should not be empty', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: ''
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.name should not be empty');
    });

    test('payload.name should should be a string', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 777
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.name should should be a string');
    });

    test('payload should have required field email', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName'
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload should have required field email');
    });

    test('payload.email should not be empty', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName',
                    email: ''
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.email should not be empty');
    });

    test('payload.email should should be a string', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName',
                    email: 777
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.email should should be a string');
    });

    test('payload should have required field password', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName',
                    email: 'testEmail',
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload should have required field password');
    });

    test('payload.password should not be empty', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName',
                    email: 'testEmail',
                    password: ''
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.password should not be empty');
    });

    test('payload.password should should be a string', () => {
        expect(() => validate({
            data: {
                payload: {
                    name: 'testName',
                    email: 'testEmail',
                    password: 777
                }
            },
            name: 'testName'
        })).toThrowError('testName: payload.password should should be a string');
    });
});

describe('Testing validateFields function', () => {
    test('should exist', () => {
        expect(validateFields).toBeDefined();
    });

    test('should be a function', () => {
        expect(typeof validateFields).toBe('function');
    });

    test('data non object fields contains not allowed field', () => {
        expect(() =>
            validateFields({
                data: {
                    wrongField: 'wrongField',
                },
                name: 'testName',
                instance: 'instance'
            }),
        ).toThrowError('testName: data contains not allowed field — wrongField');
    });

    test('data object fields contains not allowed field', () => {
        expect(() =>
            validateFields({
                data: {
                    payload: {
                        wrongField: 'wrongField'
                    }
                },
                name: 'testName',
                instance: 'instance'
            }),
        ).toThrowError('testName: data contains not allowed field — wrongField');
    });

    test('data object fields in recursion contains not allowed field', () => {
        expect(() =>
            validateFields({
                data: {
                    wrongField: {
                        wrongField: 'wrongField'
                    }
                },
                name: 'testName',
                instance: 'instance'
            }),
        ).toThrowError('testName: data contains not allowed field — wrongField');
    });
});
