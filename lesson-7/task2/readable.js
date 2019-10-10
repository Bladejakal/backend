const { Readable } = require('stream');

class Source extends Readable {
    constructor(data = [], options = {}) {
        super(options);
        this._data = data;
        this.on('data', chunk => {});
    }
    _read() {
        if (!this._data) {
            this.push(null);
        } else {
            this.push(this._data);
        }
    }
}

module.exports = Source;
