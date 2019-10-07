const {Readable} = require('stream');
const Validator = require('./validator');

class Ui extends Readable {
    constructor(data = [], options = {
        objectMode: true,
    }) {
        super(options);
        const validator = new Validator();
        data.map(customer => validator.isInvalid(customer.payload))
            .filter(Boolean)
            .forEach(validationError => this.emit('error', validationError));
        this.data = data;
    }

    _read() {
        let data = this.data.shift();

        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }
}

module.exports = Ui;
