load('../random.js')

use vpuhach

const customersCursor = db.customers.find({ 'name.first': /an/gi, 'name.last': /ie/gi });

const customersWithOrders = [];

while (customersCursor.hasNext()) {
    const { _id, name: { first, last }, balance, created } = customersCursor.next();

    let customerWithOrders = {
        first,
        last,
        orders: [],
    };

    const orders = db.orders.aggregate([
        { $match: { customerId: _id.valueOf() } },
        { $group: { _id: '$product', total: {$sum : 1},  } }
    ]);

    while (orders.hasNext()) {
        const {_id, total} = orders.next();

        customerWithOrders.orders.push({
            _id,
            total
        });
    }

    customersWithOrders.push(customerWithOrders);
}

print(JSON.stringify(customersWithOrders));
