"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importOrders = exports.deleteAllOrders = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
exports.deleteAllOrders = (0, helpers_1.createStandardDelete)({
    itemName: 'orders',
    service: services_1.ordersService
});
const lineItemDraft = (item) => {
    return {
        name: {
            en: 'Product Name'
        },
        variant: {
            sku: item.lineitems.variant.sku
        },
        price: {
            value: {
                currencyCode: 'EUR',
                centAmount: item.lineitems.price * 100,
                fractionDigits: 2
            }
        },
        quantity: parseInt(item.lineitems.quantity)
    };
};
const orderDraft = (item) => {
    return {
        /* eslint quote-props: ["error", "consistent"] */
        customerEmail: item.customerEmail,
        orderNumber: item.orderNumber,
        lineItems: [
            {
                name: {
                    en: 'Product Name'
                },
                variant: {
                    sku: item.lineitems.variant.sku
                },
                price: {
                    value: {
                        currencyCode: 'EUR',
                        centAmount: item.lineitems.price * 100,
                        fractionDigits: 2
                    }
                },
                quantity: parseInt(item.lineitems.quantity)
            }
        ],
        totalPrice: {
            currencyCode: 'EUR',
            centAmount: item.totalPrice * 100,
            fractionDigits: 2
        }
    };
};
const importOrders = (OrdersCsvFilePath = process.env.ORDERS_CSV_FILE_PATH || '/src/data/orders.csv') => require('csvtojson')()
    .fromFile(OrdersCsvFilePath)
    .then((rawJson) => [
    ...rawJson
        .reduce((result, item) => {
        const order = result.get(item.orderNumber);
        if (order) {
            order.lineItems.push(lineItemDraft(item));
            order.store = {
                typeId: 'store',
                key: 'default'
            };
            return result;
        }
        return result.set(item.orderNumber, orderDraft(item));
    }, new Map())
        .values()
])
    .then((orders) => Promise.all(orders.map((order) => (0, helpers_1.execute)({
    uri: services_1.ordersImportService.build(),
    method: 'POST',
    body: order
}))))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Orders imported'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import orders'));
exports.importOrders = importOrders;
if (nconf.get('clean')) {
    (0, exports.deleteAllOrders)();
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing orders...');
    (0, exports.importOrders)(nconf.get('csv'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvb3JkZXJzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBRzZCO0FBQzdCLHdDQUltQjtBQUNuQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFakIsUUFBQSxlQUFlLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUNsRCxRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsd0JBQWE7Q0FDdkIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUNsQyxPQUFPO1FBQ0wsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLGNBQWM7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDUCxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRztTQUNoQztRQUNELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRTtnQkFDTCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUc7Z0JBQ3RDLGNBQWMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7UUFDRCxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0tBQzVDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQy9CLE9BQU87UUFDTCxpREFBaUQ7UUFDakQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1FBQ2pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztRQUM3QixTQUFTLEVBQUU7WUFDVDtnQkFDRSxJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLGNBQWM7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFD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