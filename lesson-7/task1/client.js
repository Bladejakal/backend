const net = require('net');

const client = new net.Socket();

const filter = {
    name: {
        first: 'Brooklyn',
        last: 'dllll'
    },
    phone: '56',
    address: {
        zip: '1234',
        city: 'Kyiv',
        country: 'ukr',
        street: 'so'
    },
    email: '@gmail.com'
};

client.connect(7777, () => {
    console.log('Connected!');
    client.write(JSON.stringify(filter));
});

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed!');
});
