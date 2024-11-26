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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const success_api_1 = require("../api/success.api");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const cart_controller_1 = require("./cart.controller");
/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Deserialize the action and resource from the body
    const { action, resource } = request.body;
    if (!action || !resource) {
        throw new custom_error_1.default(400, 'Bad request - Missing body parameters.');
    }
    // Identify the type of resource in order to redirect
    // to the correct controller
    switch (resource.typeId) {
        case 'cart':
            try {
                const data = yield (0, cart_controller_1.cartController)(action, resource);
                if (data && data.statusCode === 200) {
                    (0, success_api_1.apiSuccess)(200, data.actions, response);
                    return;
                }
                throw new custom_error_1.default(data ? data.statusCode : 400, JSON.stringify(data));
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new custom_error_1.default(500, error.message);
                }
            }
            break;
        case 'payment':
            break;
        case 'order':
            break;
        default:
            throw new custom_error_1.default(500, `Internal Server Error - Resource not recognized. Allowed values are 'cart', 'payments' or 'orders'.`);
    }
});
exports.post = post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3NlcnZpY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvREFBZ0Q7QUFDaEQsMEVBQWlEO0FBQ2pELHVEQUFtRDtBQUVuRDs7Ozs7Ozs7R0FRRztBQUNJLE1BQU0sSUFBSSxHQUFHLENBQU8sT0FBZ0IsRUFBRSxRQUFrQixFQUFFLEVBQUU7SUFDakUsb0RBQW9EO0lBQ3BELE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUUxQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLHNCQUFXLENBQUMsR0FBRyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELHFEQUFxRDtJQUNyRCw0QkFBNEI7SUFDNUIsUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsS0FBSyxNQUFNO1lBQ1QsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFFcEQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDcEMsSUFBQSx3QkFBVSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN4QyxPQUFPO2dCQUNULENBQUM7Z0JBRUQsTUFBTSxJQUFJLHNCQUFXLENBQ25CLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUNyQixDQUFDO1lBQ0osQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFLENBQUM7b0JBQzNCLE1BQU0sSUFBSSxzQkFBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7WUFDSCxDQUFDO1lBRUQsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLE1BQU07UUFFUixLQUFLLE9BQU87WUFDVixNQUFNO1FBRVI7WUFDRSxNQUFNLElBQUksc0JBQVcsQ0FDbkIsR0FBRyxFQUNILHFHQUFxRyxDQUN0RyxDQUFDO0lBQ04sQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDO0FBM0NXLFFBQUEsSUFBSSxRQTJDZiJ9