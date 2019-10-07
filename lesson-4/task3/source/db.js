const EventEmitter = require('events').EventEmitter;

class Db extends EventEmitter {
    constructor() {
        super();
        this.logs = [];

        this._registerOnLog()
    }

    _registerOnLog() {
        this.on('log', chunk => {
            this._log(chunk);
        });
    }

    _log(chunk) {
        this.logs.push({
            ...chunk,
            created: new Date()
        });
    }
}

module.exports = Db;
