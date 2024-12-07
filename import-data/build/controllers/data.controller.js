"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAndImport = exports.importAllData = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const carts_controller_1 = require("../controllers/carts.controller");
const categories_controller_1 = require("../controllers/categories.controller");
const channels_controller_1 = require("../controllers/channels.controller");
const customers_controller_1 = require("../controllers/customers.controller");
const inventory_controller_1 = require("../controllers/inventory.controller");
const lineItemStates_controller_1 = require("../controllers/lineItemStates.controller");
const orders_controller_1 = require("../controllers/orders.controller");
const products_controller_1 = require("../controllers/products.controller");
const shippingMethod_controller_1 = require("../controllers/shippingMethod.controller");
const taxCategory_controller_1 = require("../controllers/taxCategory.controller");
const types_controller_1 = require("../controllers/types.controller");
const zones_controller_1 = require("../controllers/zones.controller");
const projects_controller_1 = require("../controllers/projects.controller");
const productDiscount_controller_1 = require("../controllers/productDiscount.controller");
const stores_controller_1 = require("./stores.controller");
const productStates_controller_1 = require("./productStates.controller");
const nconf = require('nconf');
const later = (time, arg) => new Promise((r) => setTimeout(() => r(arg), time));
const updateOrders = () => {
    const WAIT_TIME = 15000;
    const recur = ([toUpdate, index]) => {
        if (index >= toUpdate.length) {
            return;
        }
        return (0, helpers_1.execute)({
            uri: services_1.productsService.build(),
            method: 'GET'
        }).then((result) => {
            var _a;
            const productToUpdate = (_a = result === null || result === void 0 ? void 0 : result.body) === null || _a === void 0 ? void 0 : _a.results.find((p) => p.masterData.current.masterVariant.sku ===
                toUpdate[index]);
            if (!productToUpdate) {
                return later(WAIT_TIME, [toUpdate, index]).then(recur);
            }
            return later(WAIT_TIME)
                .then(() => (0, helpers_1.execute)({
                uri: services_1.productsService
                    .byId(productToUpdate.id)
                    .build(),
                method: 'POST',
                body: {
                    version: productToUpdate.version,
                    actions: [
                        {
                            action: 'setDescription',
                            description: productToUpdate.masterData.current.name,
                            staged: false
                        }
                    ]
                }
            }))
                .then(() => later(WAIT_TIME))
                .then(() => recur([toUpdate, index + 1]));
        });
    };
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Updating products (this could take a minute)');
    return recur([['M0E20000000ELAJ', 'M0E20000000ELBX'], 0]);
};
const taskReducer = (result, fn) => result.then(fn);
const deleteAllData = () => {
    // eslint-disable-next-line no-console
    console.log('--Deleting all project data--');
    return [
        productDiscount_controller_1.deleteAllProductDiscounts,
        products_controller_1.deleteAllProducts,
        products_controller_1.deleteAllProductTypes,
        categories_controller_1.deleteAllCategories,
        inventory_controller_1.deleteInventory,
        orders_controller_1.deleteAllOrders,
        carts_controller_1.deleteAllCarts,
        lineItemStates_controller_1.deleteAllLineItemStates,
        customers_controller_1.deleteAllCustomers,
        customers_controller_1.deleteCustomerGroups,
        stores_controller_1.deleteStores,
        shippingMethod_controller_1.deleteAllShippingMethods,
        zones_controller_1.deleteAllZones,
        taxCategory_controller_1.deleteTaxCategories,
        channels_controller_1.deleteChannels,
        types_controller_1.deleteTypes,
        orders_controller_1.deleteAllOrders
    ].reduce(taskReducer, Promise.resolve());
};
const importAllData = () => {
    // eslint-disable-next-line no-console
    console.log('--Importing all project data--');
    return [
        projects_controller_1.importProjectData,
        taxCategory_controller_1.importTaxCategories,
        types_controller_1.importTypes,
        products_controller_1.importProductTypes,
        categories_controller_1.importCategories,
        zones_controller_1.importZones,
        shippingMethod_controller_1.importShippingMethods,
        channels_controller_1.importChannels,
        lineItemStates_controller_1.importLineItemStates,
        productStates_controller_1.importProductStates,
        customers_controller_1.importCustomerGroups,
        customers_controller_1.importCustomers,
        products_controller_1.importProducts,
        stores_controller_1.importStores,
        productDiscount_controller_1.importProductDiscounts,
    ].reduce(taskReducer, Promise.resolve());
};
exports.importAllData = importAllData;
const deleteAndImport = () => [
    deleteAllData, // delete
    exports.importAllData, // create
    // updateOrders // update orders so last update is set correctly
].reduce(taskReducer, Promise.resolve());
exports.deleteAndImport = deleteAndImport;
if (nconf.get('all:clean')) {
    deleteAllData().then(() => 
    // eslint-disable-next-line no-console
    console.log('--The project data is deleted--'));
}
else if (nconf.get('all:import')) {
    (0, exports.importAllData)().then(() => 
    // eslint-disable-next-line no-console
    console.log('--All data is imported--'));
}
else if (nconf.get('start')) {
    (0, exports.deleteAndImport)().then(() => 
    // eslint-disable-next-line no-console
    console.log('--All data is imported--'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2RhdGEuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBc0Q7QUFDdEQsd0NBQW9DO0FBQ3BDLHNFQUFnRTtBQUNoRSxnRkFHNkM7QUFDN0MsNEVBQW1GO0FBQ25GLDhFQUs0QztBQUM1Qyw4RUFBc0Y7QUFDdEYsd0ZBQXdHO0FBQ3hHLHdFQUFnRjtBQUNoRiw0RUFLMkM7QUFDM0Msd0ZBR2lEO0FBQ2pELGtGQUc4QztBQUM5QyxzRUFBMEU7QUFDMUUsc0VBQTZFO0FBQzdFLDRFQUFzRTtBQUN0RSwwRkFHa0Q7QUFDbEQsMkRBQWdFO0FBQ2hFLHlFQUFnRTtBQUVoRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDOUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUF3QixFQUFFLEdBQWEsRUFBRSxFQUFFLENBQ3hELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDcEQsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQ3hCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQTtJQUN2QixNQUFNLEtBQUssR0FBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBTSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzdCLE9BQU07UUFDUixDQUFDO1FBQ0QsT0FBTyxJQUFBLGlCQUFPLEVBQUM7WUFDYixHQUFHLEVBQUUsMEJBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVB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