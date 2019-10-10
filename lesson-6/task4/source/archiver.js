const fs = require('fs');
const zlib = require('zlib');

class Archiver {
    constructor(options) {
        this.validateRules = {
            availableAlgorithms: [
                'gzip',
                'deflate'
            ]
        };
        this._validate(options);
        this._options = options;
    }

    _validate(options) {
        if (typeof options.algorithm !== 'string' || options.algorithm === "") {
            return `options.algorithm should be non-empty string`;
        }

        if (!this.validateRules.availableAlgorithms.includes(options.algorithm)) {
            throw new Error('Wrong algorithm');
        }
    }

    pack (inputFile, outputFile) {

        const readStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        let archivator = zlib.createGzip();

        if (this._options.algorithm === 'deflate') {
            archivator = zlib.createDeflate();
        }

        readStream.pipe(archivator).pipe(writeStream);
    }

    unpack (inputFile, outputFile) {
        const readStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        let unArchivator = zlib.createGzip();

        if (this._options.algorithm === 'deflate') {
            unArchivator = zlib.createInflate();
        }

        readStream.pipe(unArchivator).pipe(writeStream);
    }
}

module.exports = Archiver;
