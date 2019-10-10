const path = require('path');
const Archiver = require('./source/archiver');

const options = {
    algorithm: 'deflate'
};

const archiver = new Archiver(options);

archiver.pack(path.join(__dirname, '../data/comments.json'), path.join(__dirname, '../data/comments.zip'));
// archiver.unpack(path.join(__dirname, '../data/comments.zip'), path.join(__dirname, '../data/unpackComments.json'));
