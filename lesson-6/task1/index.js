const path = require('path');
const Json2csv = require('./source/json2csv');

const json2Csv = new Json2csv();

json2Csv.parse(path.join(__dirname, '../data/comments.json'), path.join(__dirname, '../data/comments.csv'));
