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
const dataRouter = (0, express_1.Router)();
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
dataRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvZGF0YS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFpQztBQUVqQyx3REFBK0M7QUFDL0MsNEVBRzRDO0FBQzVDLHNGQUE4RTtBQUM5RSwwRkFBbUY7QUFDbkYsNEVBQXVFO0FBQ3ZFLGtGQUE0RTtBQUM1RSxzRUFBOEQ7QUFDOUQsZ0ZBQXdFO0FBQ3hFLHNFQUE4RDtBQUM5RCx3RkFBaUY7QUFDakYsNEVBQW9FO0FBQ3BFLHdGQUFnRjtBQUNoRiw4RUFBc0U7QUFDdEUsOEVBRzZDO0FBQzdDLHNFQUFpRTtBQUNqRSx3RUFBZ0U7QUFDaEUsd0VBQWdFO0FBRWhFLE1BQU0sVUFBVSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRTVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNuRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQztRQUNILHFCQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDN0MsTUFBTSxJQUFBLHVDQUFpQixHQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUMxRCxxQkFBTSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBQ3ZELElBQUksQ0FBQztR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