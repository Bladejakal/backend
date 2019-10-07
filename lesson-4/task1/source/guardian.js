const {Transform} = require('stream');
const Encryptor = require('./encryptor');
const Validator = require('./validator');

class Guardian extends Transform {
    constructor(options = {}) {
        super(options);
        this.encryptor = new Encryptor();
        this.validator = new Validator();
        this.pipeInvocator = null;
        this.on('pipe', this._registerOnPipe);
    }

    _registerOnPipe(src) {
        this.pipeInvocator = src.constructor.name;
    }

    _transform(chunk, encoding, done) {
        const validationError = this.validator.isInvalid(chunk);
        if (validationError) {
            this.emit('error', validationError);
        }

        this.push(this._prepareCustomer(chunk));
        done();
    }

    _prepareCustomer(customer) {
        return {
            meta: {
                source: this.pipeInvocator,
            },
            payload: this.encryptor.encrypt(customer)
        };
    }
}

module.exports = Guardian;
