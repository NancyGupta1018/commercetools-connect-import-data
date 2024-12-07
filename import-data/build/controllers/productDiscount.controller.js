"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProductDiscounts = exports.deleteAllProductDiscounts = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const logger_utils_1 = require("../utils/logger.utils");
require('dotenv').config();
exports.deleteAllProductDiscounts = (0, helpers_1.createStandardDelete)({
    itemName: 'discounts',
    service: services_1.productDiscountService
});
const importProductDiscounts = () => logger_utils_1.logger.info("Reached Product Discount");
exports.importProductDiscounts = importProductDiscounts;
(0, helpers_1.execute)({
    uri: services_1.productDiscountService.build(),
    method: 'POST',
    body: {
        value: {
            type: 'relative',
            permyriad: 5000
        },
        predicate: 'sku = "M0E20000000DX1Y"',
        name: {
            en: 'test',
            de: ''
        },
        description: {
            en: 'test',
            de: ''
        },
        isActive: true,
        sortOrder: '0.2',
        references: [],
        attributeTypes: {}
    }
}).catch((error) => (0, helpers_1.logAndExit)(error, 'Failed to import product discounts'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdERpc2NvdW50LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvcHJvZHVjdERpc2NvdW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQTZEO0FBQzdELHdDQUltQjtBQUNuQix3REFBOEM7QUFDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRWIsUUFBQSx5QkFBeUIsR0FBRyxJQUFBLDhCQUFvQixFQUMzRDtJQUNFLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLE9BQU8sRUFBRSxpQ0FBc0I7Q0FDaEMsQ0FDRixDQUFBO0FBRU0sTUFBTSxzQkFBc0IsR0FBRyxHQUFHLEVBQUUsQ0FDekMscUJBQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUQ3QixRQUFBLHNCQUFzQiwwQkFDTztBQUN4QyxJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsaUNBQXNCLENBQUMsS0FBSyxFQUFFO0lBQ25DLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUUseUJBQXlCO1FBQ3BDLElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLEVBQUU7U0FDUDtRQUNELFdBQVcsRUFBRTtZQUNYLEVBQUUsRUFBRSxNQUFNO1lBQ1YsRUFBRSxFQUFFLEVBQUU7U0FDUDtRQUNELFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLEtBQUs7UUFDaEIsVUFBVSxFQUFFLEVBQUU7UUFDZCxjQUFjLEVBQUUsRUFBRTtLQUNuQjtDQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNqQixJQUFBLG9CQUFVLEVBQUMsS0FBSyxFQUFFLG9DQUFvQyxDQUFDLENBQ3hELENBQUEifQ==