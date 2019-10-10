const net = require('net');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {promisify} = require('util');
// const { pipeline } = require('stream');
const Validator = require('./validator');
const Readable = require('./readable.js');
const {parse} = require('json2csv');
const zlib = require('zlib');

const server = net.createServer();
const PORT = process.env.PORT || 7777;

const readFile = promisify(fs.readFile);

server.on('connection', socket => {
    console.log('New client connected!');

    socket.on('data', msg => {
        const input = JSON.parse(msg.toString());
        const filter = input.filter;
        const meta = input.meta;

        const validator = new Validator();
        let error = validator.check(filter);

        if (error) {
            socket.write(`${error}${os.EOL}`);
            socket.end();
        }

        readFile(path.join(__dirname, '../users.json'))
            .then(data => {
                const users = JSON.parse(data.toString());
                let result = users.filter(function (item) {
                    return findUserByFilter(item, filter);
                });


                if (meta.format === 'csv') {
                    try {
                        result = parse(result);
                    } catch (err) {
                        console.error(err);
                    }
                }

                if (meta.archive === true) {
                    let r_options = {
                        encoding: 'utf8',
                    };
                    const rs = new Readable(result, r_options);

                    rs.pipe(zlib.createGzip()).pipe(socket);
                } else {
                    socket.write(JSON.stringify(result));
                    socket.end();
                }
            })
            .catch(error => {
                console.error(error.message);
            });
    });

    socket.on('end', () => {
        console.log('Client is disconnected!');
    });
});

function findUserByFilter(user, filter) {
    for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
            if (user.hasOwnProperty(key)) {
                if (typeof filter[key] === 'object') {
                    if (findUserByFilter(user[key], filter[key])) {
                        return true;
                    }
                } else {
                    if (user[key].includes(filter[key])) {
                        return true
                    }
                }
            }
        }
    }

    return false;
}

server.on('listening', () => {
    const {port} = server.address();
    console.log(`TCP Server started on port ${port}!`);
});

server.listen(PORT);
