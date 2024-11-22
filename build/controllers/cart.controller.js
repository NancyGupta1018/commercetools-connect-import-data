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
exports.cartController = void 0;
const create_client_1 = require("../client/create.client");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
/**
 * Handle the create action
 *
 * @param {Resource} resource The resource from the request body
 * @returns {object}
 */
const create = (resource) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = undefined;
    try {
        const updateActions = [];
        // Deserialize the resource to a CartDraft
        const cartDraft = JSON.parse(JSON.stringify(resource));
        if (cartDraft.obj.lineItems.length !== 0) {
            productId = cartDraft.obj.lineItems[0].productId;
        }
        // Fetch the product with the ID
        if (productId) {
            yield (0, create_client_1.createApiRoot)()
                .products()
                .withId({ ID: productId })
                .get()
                .execute();
            // Work with the product
        }
        // Create the UpdateActions Object to return it to the client
        const updateAction = {
            action: 'recalculate',
            updateProductData: false,
        };
        updateActions.push(updateAction);
        return { statusCode: 200, actions: updateActions };
    }
    catch (error) {
        // Retry or handle the error
        // Create an error object
        if (error instanceof Error) {
            throw new custom_error_1.default(400, `Internal server error on CartController: ${error.stack}`);
        }
    }
});
// Controller for update actions
// const update = (resource: Resource) => {};
/**
 * Handle the cart controller according to the action
 *
 * @param {string} action The action that comes with the request. Could be `Create` or `Update`
 * @param {Resource} resource The resource from the request body
 * @returns {Promise<object>} The data from the method that handles the action
 */
const cartController = (action, resource) => __awaiter(void 0, void 0, void 0, function* () {
    switch (action) {
        case 'Create': {
            const data = create(resource);
            return data;
        }
        case 'Update':
            break;
        default:
            throw new custom_error_1.default(500, `Internal Server Error - Resource not recognized. Allowed values are 'Create' or 'Update'.`);
    }
});
exports.cartController = cartController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2NhcnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyREFBd0Q7QUFDeEQsMEVBQWlEO0FBR2pEOzs7OztHQUtHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsQ0FBTyxRQUFrQixFQUFFLEVBQUU7SUFDMUMsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBRTFCLElBQUksQ0FBQztRQUNILE1BQU0sYUFBYSxHQUF3QixFQUFFLENBQUM7UUFFOUMsMENBQTBDO1FBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXZELElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbkQsQ0FBQztRQUVELGdDQUFnQztRQUNoQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFBLDZCQUFhLEdBQUU7aUJBQ2xCLFFBQVEsRUFBRTtpQkFDVixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQ3pCLEdBQUcsRUFBRTtpQkFDTCxPQUFPLEVBQUUsQ0FBQztZQUViLHdCQUF3QjtRQUMxQixDQUFDO1FBRUQsNkRBQTZEO1FBQzdELE1BQU0sWUFBWSxHQUFpQjtZQUNqQyxNQUFNLEVBQUUsYUFBYTtZQUNyQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUM7UUFFRixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFLENBQUM7WUFDM0IsTUFBTSxJQUFJLHNCQUFXLENBQ25CLEdBQUcsRUFDSCw0Q0FBNEMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUMxRCxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVGLGdDQUFnQztBQUNoQyw2Q0FBNkM7QUFFN0M7Ozs7OztHQU1HO0FBQ0ksTUFBTSxjQUFjLEdBQUcsQ0FBTyxNQUFjLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBQ3pFLFFBQVEsTUFBTSxFQUFFLENBQUM7UUFDZixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsS0FBSyxRQUFRO1lBQ1gsTUFBTTtRQUVSO1lBQ0UsTUFBTSxJQUFJLHNCQUFXLENBQ25CLEdBQUcsRUFDSCwyRkFBMkYsQ0FDNUYsQ0FBQztJQUNOLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQWZXLFFBQUEsY0FBYyxrQkFlekIifQ==