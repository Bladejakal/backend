const path = require('path');
const Archiver = require('./source/archiver');

const archiver = new Archiver();

// archiver.pack(path.join(__dirname, '../data/comments.json'), path.join(__dirname, '../data/comments.zip'));
archiver.unpack(path.join(__dirname, '../data/comments.zip'), path.join(__dirname, '../data/unpackComments.json'));
