const Ui = require('./source/ui.js');
const Guardian = require('./source/guardian.js');
const AccountManager = require('./source/accountManager.js');
const Logger = require('./source/logger.js');

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
const ui = new Ui(customers);
const guardian = new Guardian();
const logger = new Logger();
const manager = new AccountManager();

ui.pipe(guardian).pipe(logger).pipe(manager);