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
const shippingMethod_controller_1 = require("../controllers/shippingMethod.controller");
const shippingMethodRouter = (0, express_1.Router)();
shippingMethodRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_utils_1.logger.info('Importing shipping method message received');
    try {
        logger_utils_1.logger.info('Create shipping-method try block');
        yield (0, shippingMethod_controller_1.importShippingMethods)();
        res.send("importing shipping-method successfully!!");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = shippingMethodRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdNZXRob2Qucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL3NoaXBwaW5nTWV0aG9kLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWlDO0FBRWpDLHdEQUErQztBQUMvQyx3RkFBaUY7QUFFakYsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUV0QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsRUFBRTtJQUNsRCxxQkFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBQzFELElBQUksQ0FBQztRQUNELHFCQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFBLGlEQUFxQixHQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFJUCxrQkFBZSxvQkFBb0IsQ0FBQyJ9