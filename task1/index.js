load('../random.js')

use vpuhach

const customersCursor = db.customers.find({ 'name.first': /an/gi, 'name.last': /ie/gi });

const customersWithOrders = [];

while (customersCursor.hasNext()) {
    const { _id, name: { first, last }, balance, created } = customersCursor.next();

    let customerWithOrders = {
        name: {
            first,
            last
        },
        balance,
        created,
        orders: []
    };

    const orders = db.orders.find({customerId: _id.valueOf()});

    while (orders.hasNext()) {
        const { count, price, discount, title, product } = orders.next();
        customerWithOrders.orders.push({
            count, price, discount, title, product
        })
    }

    customersWithOrders.push(customerWithOrders);
}

print(JSON.stringify(customersWithOrders));
