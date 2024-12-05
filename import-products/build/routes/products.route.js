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
const productRouter = (0, express_1.Router)();
productRouter.post('/create-products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing products message received');
    try {
        logger_utils_1.logger.info('Create products try block');
        yield (0, products_controller_1.importProducts)();
        res.send("importing products successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
productRouter.post('/create-productTypes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product type message received');
    try {
        logger_utils_1.logger.info('Create product-types try block');
        yield (0, products_controller_1.importProductTypes)();
        res.send("importing product types successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
productRouter.post('/product-states', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product states n message received');
    try {
        logger_utils_1.logger.info('Create product states try block');
        yield (0, productStates_controller_1.importProductStates)();
        res.send("importing product states successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
productRouter.post('/product-discount', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing product discount message received');
    try {
        logger_utils_1.logger.info('Create product discount try block');
        yield (0, productDiscount_controller_1.importProductDiscounts)();
        res.send("importing product discount successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = productRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3Byb2R1Y3RzLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBRWpDLHdEQUErQztBQUMvQyw0RUFBd0Y7QUFDeEYsc0ZBQThFO0FBQzlFLDBGQUFtRjtBQUVuRixNQUFNLGFBQWEsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUUvQixhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsRUFBRTtJQUMxRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQztRQUNELHFCQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsTUFBTSxJQUFBLG9DQUFjLEdBQUUsQ0FBQztRQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUdMLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFO0lBQ2hFLHFCQUFNLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDO1FBQ0QscUJBQU0sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5QyxNQUFNLElBQUEsd0NBQWtCLEdBQUUsQ0FBQztRQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUdILGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFO0lBQzdELHFCQUFNLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDO1FBQ0QscUJBQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUEsOENBQW1CLEdBQUUsQ0FBQztRQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUdILGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFO0lBQzdELHFCQUFNLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDO1FBQ0QscUJBQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNqRCxNQUFNLElBQUEsbURBQXNCLEdBQUUsQ0FBQztRQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUtULGtCQUFlLGFBQWEsQ0FBQyJ9