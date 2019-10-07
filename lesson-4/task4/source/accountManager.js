const { Writable } = require('stream');

class AccountManager extends Writable {
    constructor(options = {
        objectMode: true,
    }) {
        super(options);
        this.accounts = [];
    }

    _write(chunk, encoding, done) {
        this.accounts.push(chunk);
        done();
    }
}

module.exports = AccountManager;
