const {Transform} = require('stream');
const Cipherer = require('./cipherer');
const Validator = require('./validator');

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
        return {
            meta: {
                source: this.pipeInvocator,
            },
            payload: {
                ...customer,
                email: this.cipherer.cipher(customer.email),
                password: this.cipherer.cipher(customer.password),
            }
        };
    }
}

module.exports = Guardian;
