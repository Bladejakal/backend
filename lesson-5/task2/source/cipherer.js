const crypto = require('crypto');

class Cipherer {
    constructor(
        password = 'default_pass',
        salt = 'default_salt',
        inputEncoding = 'utf8',
        outputEncoding = 'hex',
        algorithm = 'aes192'
    ) {
        this.key = crypto.scryptSync(password, salt, 24);
        this.inputEncoding = inputEncoding;
        this.outputEncoding = outputEncoding;
        this.algorithm = algorithm;
        this.iv = crypto.randomFillSync(Buffer.alloc(16), 10);
    }

    cipher(data) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        const cipheredData = cipher.update(data, this.inputEncoding, this.outputEncoding);

        return cipheredData + cipher.final(this.outputEncoding);
    }

    decipher(data) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        const decipheredData = decipher.update(data, this.outputEncoding, this.inputEncoding);

        return decipheredData + decipher.final(this.inputEncoding);
    }
}

module.exports = Cipherer;
