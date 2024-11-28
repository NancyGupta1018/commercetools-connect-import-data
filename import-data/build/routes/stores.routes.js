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
const stores_controller_1 = require("../controllers/stores.controller");
const storeRouter = (0, express_1.Router)();
storeRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = storeRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVzLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvc3RvcmVzLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFpQztBQUVqQyx3REFBK0M7QUFDL0Msd0VBQWdFO0FBRWhFLE1BQU0sV0FBVyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRTdCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QyxxQkFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQztRQUNILHFCQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFBLGdDQUFZLEdBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGtCQUFlLFdBQVcsQ0FBQyJ9