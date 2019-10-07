const Ui = require('./source/ui');
const Guardian = require('./source/guardian');
const AccountManager = require('./source/accountManager');

const customers = [
    {
        name: 'Pitter Black',
        email: 'pblack@email.com',
        password: 'pblack_123'
    },
    {
        name: 'Oliver White',
        email: 'owhite@email.com',
        password: 'owhite_456'
    }
];
const r_options = {
    objectMode: true,
};
const ui = new Ui(customers, r_options);

const t_options = {
    readableObjectMode: true,
    writableObjectMode: true,
};
const guardian = new Guardian(t_options);

const w_options = {
    objectMode: true,
};
const manager = new AccountManager(w_options);

ui.pipe(guardian).pipe(manager);
