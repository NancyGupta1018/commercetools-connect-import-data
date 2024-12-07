"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_utils_1 = require("../utils/logger.utils");
const products_controller_1 = require("../controllers/products.controller");
const productStates_controller_1 = require("../controllers/productStates.controller");
const productDiscount_controller_1 = require("../controllers/productDiscount.controller");
const projects_controller_1 = require("../controllers/projects.controller");
const taxCategory_controller_1 = require("../controllers/taxCategory.controller");
const types_controller_1 = require("../controllers/types.controller");
const categories_controller_1 = require("../controllers/categories.controller");
const zones_controller_1 = require("../controllers/zones.controller");
const shippingMethod_controller_1 = require("../controllers/shippingMethod.controller");
const channels_controller_1 = require("../controllers/channels.controller");
const lineItemStates_controller_1 = require("../controllers/lineItemStates.controller");
const inventory_controller_1 = require("../controllers/inventory.controller");
const customers_controller_1 = require("../controllers/customers.controller");
const carts_controller_1 = require("../controllers/carts.controller");
const orders_controller_1 = require("../controllers/orders.controller");
const stores_controller_1 = require("../controllers/stores.controller");
const data_controller_1 = require("../controllers/data.controller");
const dataRouter = (0, express_1.Router)();
dataRouter.post('/data', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing all data message received');
    try {
        logger_utils_1.logger.info('Create all data try block');
        yield (0, data_controller_1.deleteAndImport)();
        res.send('importing all data successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/project', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing projects message received');
    try {
        logger_utils_1.logger.info('Create project data try block');
        yield (0, projects_controller_1.importProjectData)();
        res.send('importing project data successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/tax-categories', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing tax category message received');
    try {
        logger_utils_1.logger.info('Create tax category try block');
        yield (0, taxCategory_controller_1.importTaxCategories)();
        res.send('importing tax-categories successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/types', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing types message received');
    try {
        logger_utils_1.logger.info('Create types try block');
        yield (0, types_controller_1.importTypes)();
        res.send('importing types successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/product-types', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product type message received');
    try {
        logger_utils_1.logger.info('Create product-types try block');
        yield (0, products_controller_1.importProductTypes)();
        res.send('importing product types successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/categories', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Create Categories message received');
    try {
        logger_utils_1.logger.info('Create Categories try block');
        yield (0, categories_controller_1.importCategories)(process.env.CSV_FILE_PATH);
        res.send('importing categories successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/zones', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing zones message received');
    try {
        logger_utils_1.logger.info('Create zones try block');
        yield (0, zones_controller_1.importZones)();
        res.send('importing zones successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/shipping-methods', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing shipping method message received');
    try {
        logger_utils_1.logger.info('Create shipping-method try block');
        yield (0, shippingMethod_controller_1.importShippingMethods)();
        res.send('importing shipping-method successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/channel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing channels message received');
    try {
        logger_utils_1.logger.info('Create channel try block');
        yield (0, channels_controller_1.importChannels)();
        res.send('importing channel successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/lineItem-states', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing lineItem message received');
    try {
        logger_utils_1.logger.info('Create lineItem try block');
        yield (0, lineItemStates_controller_1.importLineItemStates)();
        res.send('importing lineItem successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/product-states', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product states n message received');
    try {
        logger_utils_1.logger.info('Create product states try block');
        yield (0, productStates_controller_1.importProductStates)();
        res.send('importing product states successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing products message received');
    try {
        logger_utils_1.logger.info('Create products try block');
        yield (0, products_controller_1.importProducts)();
        res.send('importing products successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/inventory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing inventory message received');
    try {
        logger_utils_1.logger.info('Create inventory try block');
        yield (0, inventory_controller_1.importInventory)(process.env.INVENTORY_FILE_PATH, process.env.INVENTORY_STORES_FILE_PATH);
        res.send('importing inventory successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/product-discount', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product discount message received');
    try {
        logger_utils_1.logger.info('Create product discount try block');
        yield (0, productDiscount_controller_1.importProductDiscounts)();
        res.send('importing product discount successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/customers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing customer message received');
    try {
        logger_utils_1.logger.info('Create customer try block');
        yield (0, customers_controller_1.importCustomers)();
        yield (0, customers_controller_1.importCustomerGroups)();
        res.send('importing customer and customer groups successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/delete-carts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Deleting carts message received');
    try {
        logger_utils_1.logger.info('Delete carts try block');
        yield (0, carts_controller_1.deleteAllCarts)();
        res.send('deleting carts successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/orders', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing orders message received');
    try {
        logger_utils_1.logger.info('Create orders try block');
        yield (0, orders_controller_1.importOrders)(process.env.ORDERS_CSV_FILE_PATH);
        res.send('importing orders successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
dataRouter.post('/stores', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing stores message received');
    try {
        logger_utils_1.logger.info('stores router try block');
        yield (0, stores_controller_1.importStores)();
        res.send('importing stores successfully!!');
    }
    catch (error) {
        next(error);
    }
}));
exports.default = dataRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvZGF0YS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFpQztBQUVqQyx3REFBK0M7QUFDL0MsNEVBRzRDO0FBQzVDLHNGQUE4RTtBQUM5RSwwRkFBbUY7QUFDbkYsNEVBQXVFO0FBQ3ZFLGtGQUE0RTtBQUM1RSxzRUFBOEQ7QUFDOUQsZ0ZBQXdFO0FBQ3hFLHNFQUE4RDtBQUM5RCx3RkFBaUY7QUFDakYsNEVBQW9FO0FBQ3BFLHdGQUFnRjtBQUNoRiw4RUFBc0U7QUFDdEUsOEVBRzZDO0FBQzdDLHNFQUFpRTtBQUNqRSx3RUFBZ0U7QUFDaEUsd0VBQWdFO0FBQ2hFLG9FQUFnRTtBQUVoRSxNQUFNLFVBQVUsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUU1QixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDaEQscUJBQU0sQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUM7UUFDSCxxQkFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBQSxpQ0FBZSxHQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDbkQscUJBQU0sQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNuRCxJ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