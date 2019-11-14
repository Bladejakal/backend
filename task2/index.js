load('../random.js')

use vpuhach

// Cleanup previous changes
db.customers.drop(); // drops the collection customers
db.orders.drop(); // drops the collection orders

// Create collection customers
db.createCollection('customers');

// Create collection customers
db.createCollection('orders');

const customers = [];

for (let i = 0; i < 3000; i++) {
    customers.push({
        name: {
            first: faker.fName(),
            last: faker.lName(),
        },
        balance: randomNumber(100, 20000),
        created: randomDate(new Date('2010-12-17T03:24:00'), new Date('2019-10-17T03:24:00'))
    });
}

const { insertedIds } = db.customers.insertMany(customers);

const orders = [];

insertedIds.forEach((insertedId) => {
    orders.push({
        customerId: insertedId.valueOf(),
        count: randomNumber(1,100),
        price: randomNumber(20, 100),
        discount: randomNumber(5, 30),
        title: faker.title(),
        product: faker.product()
    });
});

const { ordersInsertedIds } = db.orders.insertMany(orders);
