const {Writable} = require('stream');
const Cipherer = require('./cipherer');
const Validator = require('./validator');

class AccountManager extends Writable {
    constructor(cipherer = null, validator = null, options) {
        super(options);
        this.cipherer = cipherer || new Cipherer();
        this.validator = validator || new Validator();
        this.accounts = [];
    }

    _write(chunk, encoding, done) {
        this._addAccount(JSON.parse(chunk.toString()));
        done();
    }

    _addAccount({payload: accountData}) {
        const validationError = this.validator.isInvalid(accountData);

        if (validationError) {
            this.emit('error', validationError);
        }

        const customer = this._decipherCustomer(accountData);

        this.accounts.push(customer);
    }

    _decipherCustomer(account) {
        return {
            ...account,
            email: this.cipherer.decipher(account.email),
            password: this.cipherer.decipher(account.password),
        }
    }
}

module.exports = AccountManager;
