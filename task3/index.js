load('../random.js')

use vpuhach

const getCustomersWithOrders = (size, page) => {
    const customersCursor = db.customers.find().limit(size).skip(size*page);

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

    return customersWithOrders;
};

print(JSON.stringify(getCustomersWithOrders(2,2)));
