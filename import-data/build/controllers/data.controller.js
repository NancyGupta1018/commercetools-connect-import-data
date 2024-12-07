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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2RhdGEuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBc0Q7QUFDdEQsd0NBQW9DO0FBQ3BDLHNFQUFnRTtBQUNoRSxnRkFHNkM7QUFDN0MsNEVBQW1GO0FBQ25GLDhFQUs0QztBQUM1Qyw4RUFBc0Y7QUFDdEYsd0ZBQXdHO0FBQ3hHLHdFQUFnRjtBQUNoRiw0RUFLMkM7QUFDM0Msd0ZBR2lEO0FBQ2pELGtGQUc4QztBQUM5QyxzRUFBMEU7QUFDMUUsc0VBQTZFO0FBQzdFLDRFQUFzRTtBQUN0RSwwRkFHa0Q7QUFDbEQsMkRBQWdFO0FBR2hFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM5QixNQUFNLEtBQUssR0FBRyxDQUFDLElBQXdCLEVBQUUsR0FBYSxFQUFFLEVBQUUsQ0FDeEQsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLE1BQU0sS0FBSyxHQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFNLEVBQUUsRUFBRTtRQUM1QyxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0IsT0FBTTtRQUNSLENBQUM7UUFDRCxPQUFPLElBQUEsaUJBQU8sRUFBQztZQUNiLEdBQUcsRUFBRSwwQkFBZSxDQUFDLEtBQUssRUFBRTtZQUM1QixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7WUFDakIsTUFB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