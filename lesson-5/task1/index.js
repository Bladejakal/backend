const Ui = require('./source/ui');
const Guardian = require('./source/guardian');
const AccountManager = require('./source/accountManager');
const Cipherer = require('./source/cipherer');

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

const cipherer = new Cipherer();

const ui = new Ui(customers);
const guardian = new Guardian(cipherer);
const manager = new AccountManager(cipherer);

ui.pipe(guardian).pipe(manager);
