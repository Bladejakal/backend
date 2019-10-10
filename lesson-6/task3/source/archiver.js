const fs = require('fs');
const zlib = require('zlib');

class Archiver {
    pack (inputFile, outputFile) {

        const readStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        readStream.pipe(zlib.createGzip()).pipe(writeStream);
    }

    unpack (inputFile, outputFile) {
        const readStream = fs.createReadStream(inputFile);
        const writeStream = fs.createWriteStream(outputFile);

        readStream.pipe(zlib.createGunzip()).pipe(writeStream);
    }
}

module.exports = Archiver;
