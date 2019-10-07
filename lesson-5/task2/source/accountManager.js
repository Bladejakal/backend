const {Writable} = require('stream');
const Cipherer = require('./cipherer');
const Validator = require('./validator');
const crypto = require('crypto');
const certificates = require('./certificates');

class AccountManager extends Writable {
    constructor(cipherer = null, validator = null, options) {
        super(options);
        this.cipherer = cipherer || new Cipherer();
        this.validator = validator || new Validator();
        this.accounts = [];
    }

    _write(chunk, encoding, done) {
        const account = JSON.parse(chunk.toString());
        if (this._verify(account)) {
            this._addAccount(account);
            done();
        } else {
            this.emit('error', "Signature verification failed");
        }
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

    _verify(chunk) {
        const {signature} = chunk.meta;
        const {email, password} = chunk.payload;
        const verify = crypto.createVerify("SHA256");

        verify.update(email);
        verify.update(password);
        verify.end();

        return verify.verify(certificates.public, signature, "hex");
    }
}

module.exports = AccountManager;
