const {Transform} = require('stream');
const Db = require('./db');

class Logger extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true,
    }) {
        super(options);
        this.pipeInvocator = null;
        this.on('pipe', this._registerOnPipe);
        this._db = new Db();
    }

    _registerOnPipe(src) {
        this.pipeInvocator = src.constructor.name;
    }

    _transform(chunk, encoding, done) {
        chunk.meta.source = this.pipeInvocator;
        this._db.emit('log', chunk);

        this.push(chunk);
        done();
    }
}

module.exports = Logger;
