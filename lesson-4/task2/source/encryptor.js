class Encryptor {
    encrypt(chunk) {
        const {email, password} = chunk;

        return {
            ...chunk,
            email: this.encode(email),
            password: this.encode(password)
        };
    }

    encode(string) {
        return Buffer.from(string, 'utf8').toString('hex');
    }
}

module.exports = Encryptor;
