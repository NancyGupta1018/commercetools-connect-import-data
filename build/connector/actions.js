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
exports.createCartUpdateExtension = createCartUpdateExtension;
exports.deleteCartUpdateExtension = deleteCartUpdateExtension;
exports.createCustomCartDiscountType = createCustomCartDiscountType;
const CART_UPDATE_EXTENSION_KEY = 'myconnector-cartUpdateExtension';
const CART_DISCOUNT_TYPE_KEY = 'myconnector-cartDiscountType';
function createCartUpdateExtension(apiRoot, applicationUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: CART_UPDATE_EXTENSION_KEY })
                .delete({
                queryArgs: {
                    version: extension.version,
                },
            })
                .execute();
        }
        yield apiRoot
            .extensions()
            .post({
            body: {
                key: CART_UPDATE_EXTENSION_KEY,
                destination: {
                    type: 'HTTP',
                    url: applicationUrl,
                },
                triggers: [
                    {
                        resourceTypeId: 'cart',
                        actions: ['Update'],
                    },
                ],
            },
        })
            .execute();
    });
}
function deleteCartUpdateExtension(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: extensions }, } = yield apiRoot
            .extensions()
            .get({
            queryArgs: {
                where: `key = "${CART_UPDATE_EXTENSION_KEY}"`,
            },
        })
            .execute();
        if (extensions.length > 0) {
            const extension = extensions[0];
            yield apiRoot
                .extensions()
                .withKey({ key: CART_UPDATE_EXTENSION_KEY })
                .delete({
                queryArgs: {
                    version: extension.version,
                },
            })
                .execute();
        }
    });
}
function createCustomCartDiscountType(apiRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { results: types }, } = yield apiRoot
            .types()
            .get({
            queryArgs: {
                where: `key = "${CART_DISCOUNT_TYPE_KEY}"`,
            },
        })
            .execute();
        if (types.length > 0) {
            const type = types[0];
            yield apiRoot
                .types()
                .withKey({ key: CART_DISCOUNT_TYPE_KEY })
                .delete({
                queryArgs: {
                    version: type.version,
                },
            })
                .execute();
        }
        yield apiRoot
            .types()
            .post({
            body: {
                key: CART_DISCOUNT_TYPE_KEY,
                name: {
                    en: 'Custom type to store a string',
                },
                resourceTypeIds: ['cart-discount'],
                fieldDefinitions: [
                    {
                        type: {
                            name: 'String',
                        },
                        name: 'customCartField',
                        label: {
                            en: 'Custom cart field',
                        },
                        required: false,
                    },
                ],
            },
        })
            .execute();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0b3IvYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLDhEQStDQztBQUVELDhEQTJCQztBQUVELG9FQW9EQztBQXJJRCxNQUFNLHlCQUF5QixHQUFHLGlDQUFpQyxDQUFDO0FBQ3BFLE1BQU0sc0JBQXNCLEdBQUcsOEJBQThCLENBQUM7QUFFOUQsU0FBc0IseUJBQXlCLENBQzdDLE9BQW1DLEVBQ25DLGNBQXNCOztRQUV0QixNQUFNLEVBQ0osSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUM5QixHQUFHLE1BQU0sT0FBTzthQUNkLFVBQVUsRUFBRTthQUNaLEdBQUcsQ0FBQztZQUNILFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsVUFBVSx5QkFBeUIsR0FBRzthQUM5QztTQUNGLENBQUM7YUFDRCxPQUFPLEVBQUUsQ0FBQztRQUViLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMxQixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsTUFBTSxPQUFPO2lCQUNWLFVBQVUsRUFBRTtpQkFDWixPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsQ0FBQztpQkFDM0MsTUFBTSxDQUFDO2dCQUNOLFNBQVMsRUFBRTtvQkFDVCxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87aUJBQzNCO2FBQ0YsQ0FBQztpQkFDRCxPQUFPLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLE9BQU87YUFDVixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUM7WUFDSixJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLHlCQUF5QjtnQkFDOUIsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEdBQUcsRUFBRSxjQUFjO2lCQUNwQjtnQkFD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