const { Writable } = require('stream');

class AccountManager extends Writable {
    constructor(options = {
        objectMode: true,
    }) {
        super(options);
        this.accounts = [];
    }

    _write(chunk, encoding, done) {
        if (typeof chunk === "object") {
            process.stdout.write(`Receive object. Payload: ${JSON.stringify(chunk.payload)}\n`);
        }

        this.accounts.push(chunk);
        done();
    }
}

module.exports = AccountManager;
