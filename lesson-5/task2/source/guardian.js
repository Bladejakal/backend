const {Transform} = require('stream');
const Cipherer = require('./cipherer');
const Validator = require('./validator');
const crypto = require('crypto');
const certificates = require('./certificates');

class Guardian extends Transform {
    constructor(cipherer = null, validator = null, options = {}) {
        super(options);
        this.cipherer = cipherer || new Cipherer();
        this.validator = validator || new Validator();
        this.pipeInvocator = null;
        this.on('pipe', this.onPipe);
    }

    onPipe(src) {
        this.pipeInvocator = src.constructor.name;
    }

    _transform(chunk, encoding, done) {
        const customer = JSON.parse(chunk.toString());
        const validationError = this.validator.isInvalid(customer);
        if (validationError) {
            this.emit('error', validationError);
        }

        this.push(JSON.stringify(this._prepareCustomer(customer)));

        done();
    }

    _prepareCustomer(customer) {
        const email = this.cipherer.cipher(customer.email);
        const password = this.cipherer.cipher(customer.password);

        return {
            meta: {
                source: this.pipeInvocator,
                signature: this._sign(email, password)
            },
            payload: {
                ...customer,
                email,
                password,
            }
        };
    }

    _sign(email, password) {
        const sign = crypto.createSign("SHA256");

        sign.update(email);
        sign.update(password);
        sign.end();

        return sign.sign(certificates.private, "hex");
    }
}

module.exports = Guardian;
