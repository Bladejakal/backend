load('../random.js')

use vpuhach

// Cleanup previous changes
db.customers.drop(); // drops the collection customers
db.orders.drop(); // drops the collection orders

// Create collection customers
db.createCollection('customers');

// Create collection customers
db.createCollection('orders');


for (let i = 0; i < 3000; i++) {
    const { insertedId } = db.customers.insertOne({
        name: {
            first: faker.fName(),
            last: faker.lName(),
        },
        balance: randomNumber(100, 20000),
        created: randomDate(new Date('2010-12-17T03:24:00'), new Date('2019-10-17T03:24:00'))
    });

    const orders = [];
    const randomOrdersCount = randomNumber(1, 10);

    for (let i = 0; i < randomOrdersCount; i++) {
        orders.push({
            customerId: insertedId.valueOf(),
            count: randomNumber(1,100),
            price: randomNumber(20, 100),
            discount: randomNumber(5, 30),
            title: faker.title(),
            product: faker.product()
        });
    }

    db.orders.insertMany(orders);
}
