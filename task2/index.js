use vpuhach

// Cleanup previous changes
db.customers.drop(); // drops the collection customers

// Create collection customers
db.createCollection('customers');

db.customers.insertOne({
    name: {
        first: 'John',
        last:  'Doe'
    },
    nickname: 'jdoe_star',
    email:    'jdoe@email.com',
    password: 'ab123456cd',
    created:  '2019-03-15T17:05:15.286Z'
});

db.customers.createIndex({ nickname: 1, email: 1 }, { unique: true });

db.customers.insertOne({
    name: {
        first: 'John',
        last:  'Doe'
    },
    nickname: 'jdoe_star',
    email:    'jdoe@email.com',
    password: 'ab123456cd',
    created:  '2019-03-15T17:05:15.286Z'
});
