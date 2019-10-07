const { Transform } = require("stream");

class Decryptor extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true,
    }) {
        super(options);
        this.possibleAlgorithms = ["hex", "base64"];
    }

    _transform(chunk, encoding, done) {
        const {meta, payload: {name, email, password}} = chunk;
        this._validate(meta.algorithm);

        const result = {
            name,
            password: this._decode(email, meta.algorithm),
            email: this._decode(password, meta.algorithm)
        };

        this.push(result);
        done();
    }

    _decode(string, algorithm) {
        return Buffer.from(string, algorithm).toString()
    }

    _validate(algorithm){
        if(!this.possibleAlgorithms.includes(algorithm)){
            this.emit("error", new Error(`Unknown algorithm ${algorithm}`))
        }
    }
}

module.exports = Decryptor;
