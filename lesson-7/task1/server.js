const net = require('net');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {promisify} = require('util');
// const { pipeline } = require('stream');
const Validator = require('./validator');

const server = net.createServer();
const PORT = process.env.PORT || 7777;

const readFile = promisify(fs.readFile);

server.on('connection', socket => {
    console.log('New client connected!');

    socket.on('data', msg => {
        const filter = JSON.parse(msg.toString());

        const validator = new Validator();
        let error = validator.check(filter);

        if (error) {
            socket.write(`${error}${os.EOL}`);
            socket.end();
        }

        readFile(path.join(__dirname, '../users.json'))
            .then(data => {
                const users = JSON.parse(data.toString());
                const result = users.filter(function (item) {
                    return findUserByFilter(item, filter);
                });

                socket.write(JSON.stringify(result));
                socket.end();
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
