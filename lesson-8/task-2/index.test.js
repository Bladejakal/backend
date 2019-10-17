const {Bank} = require('./index');

describe('Testing Bank class', () => {
    test('should exist', () => {
        expect(Bank).toBeDefined();
    });

    test('should be a function', () => {
        expect(typeof Bank).toBe('function');
    });

    test('register function should return some customer id', () => {
        const bank = new Bank();
        expect(typeof bank.register({name: 'testName', balance: 100})).toBe('number');
    });

    test('register function should return an error if customer name is duplicate', () => {
        const bank = new Bank();
        bank.register({name: 'testName', balance: 100});

        expect(() => bank.register({
            name: 'testName',
            balance: 100
        })).toThrowError(`duplicated customer for name: 'testName'`);
    });

    test('amount should be grater than 0 on add', () => {
        const bank = new Bank();
        let personId = bank.register({name: 'testName', balance: 100});

        expect(() => bank.emit('add', personId, -1)).toThrowError('amount should be grater than 0');
    });

    test('customer should exist for adding', () => {
        const bank = new Bank();
        bank.register({name: 'testName', balance: 100});

        const wrongId = 'wrongId';
        expect(() => bank.emit('add', wrongId, 27)).toThrowError(`customer with id 'wrongId' not found`);
    });


    test('add function should update the balance', () => {
        const bank = new Bank();
        let personId = bank.register({name: 'testName', balance: 100});

        expect(bank.emit('add', personId, 27)).toBeTruthy();
    })
});
