load('../random.js')

use vpuhach

// Cleanup previous changes
db.customers.drop(); // drops the collection customers

// Create collection customers
db.createCollection('customers');

const customers = [];

for (let i = 0; i < 3000; i++) {
    customers.push({
        name: {
            first: faker.fName(),
            last: faker.lName(),
        },
        nickname: faker.randomWord(), // not nickname off course, but why not )
        email: `${faker.fName().toLowerCase()}@email.com`,
        password: faker.randomWord(), // not password too, but let it be )
        created: randomDate(new Date('2010-12-17T03:24:00'), new Date('2019-10-17T03:24:00'))
    });
}

const { insertedIds } = db.customers.insertMany(customers);

db.customers.createIndex({ email: 1 });
db.customers.find({ 'email': /an/gi }); // find with index

db.customers.createIndex({ 'name.first': 1, 'name.last': 1 });
db.customers.find({ 'name.first': /an/gi, 'name.last': /ie/gi }); // find with index


db.customers.createIndex({ 'email': 1, 'created': -1 });
db.customers.find({ 'email': /an/gi,created: {
        $gte: ISODate("2019-09-17T03:24:00"),
        $lt: ISODate("2019-10-17T03:24:00")
    } }).sort({ email: 1, created: -1 })
