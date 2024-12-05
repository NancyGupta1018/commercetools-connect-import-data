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
const importOrders = (csvFilePath = process.env.ORDERS_CSV_FILE_PATH || './data/orders.csv') => require('csvtojson')()
    .fromFile(csvFilePath)
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