"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeService = exports.customerGroupService = exports.productTypesService = exports.productsService = exports.channelsService = exports.categoriesService = exports.client = void 0;
const config_1 = require("../config");
const sdk_client_1 = require("@commercetools/sdk-client");
const sdk_middleware_auth_1 = require("@commercetools/sdk-middleware-auth");
const sdk_middleware_http_1 = require("@commercetools/sdk-middleware-http");
const api_request_builder_1 = require("@commercetools/api-request-builder");
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
exports.client = (0, sdk_client_1.createClient)({
    // The order of the middlewares is important !!!
    middlewares: [
        (0, sdk_middleware_auth_1.createAuthMiddlewareForClientCredentialsFlow)({
            host: config_1.config.authUrl,
            projectKey: config_1.config.projectKey,
            credentials: {
                clientId: config_1.config.clientId,
                clientSecret: config_1.config.clientSecret,
            },
        }),
        (0, sdk_middleware_http_1.createHttpMiddleware)({ host: config_1.config.apiUrl, fetch }),
    ],
});
const createCategories = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).categories;
const createChannels = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).channels;
const createProducts = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).products;
const createProductTypes = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).productTypes;
const createCustomerGroupService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).customerGroups;
const createStoreService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).stores;
exports.categoriesService = createCategories();
exports.channelsService = createChannels();
exports.productsService = createProducts();
exports.productTypesService = createProductTypes();
exports.customerGroupService = createCustomerGroupService();
exports.storeService = createStoreService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW1DO0FBQ25DLDBEQUF5RDtBQUN6RCw0RUFBa0c7QUFDbEcsNEVBQTBFO0FBQzFFLDRFQUc0QztBQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0IsUUFBQSxNQUFNLEdBQUcsSUFBQSx5QkFBWSxFQUFDO0lBQ2pDLGdEQUFnRDtJQUNoRCxXQUFXLEVBQUU7UUFDWCxJQUFBLGtFQUE0QyxFQUFDO1lBQzNDLElBQUksRUFBRSxlQUFNLENBQUMsT0FBTztZQUNwQixVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVU7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxlQUFNLENBQUMsUUFBUTtnQkFDekIsWUFBWSxFQUFFLGVBQU0sQ0FBQyxZQUFZO2FBQ2xDO1NBQ0YsQ0FBQztRQUNGLElBQUEsMENBQW9CLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUNyRDtDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxFQUFFLENBQzVCLElBQUEsMENBQW9CLEVBQUMsRUFBRSxVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0FBRXJFLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUMxQixJQUFBLDBDQUFvQixFQUFDLEVBQUUsVUFBVSxFQUFFLGVBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUVuRSxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUUsQ0FDMUIsSUFBQSwwQ0FBb0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxlQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFFbkUsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUUsQ0FDOUIsSUFBQSwwQ0FBb0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxlQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFFdkUsTUFBTSwwQkFBMEIsR0FBRyxHQUFHLEVBQUUsQ0FDdEMsSUFBQSwwQ0FBb0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxlQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7QUFFekUsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUUsQ0FDOUIsSUFBQSwwQ0FBb0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxlQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFFcEQsUUFBQSxpQkFBaUIsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3ZDLFFBQUEsZUFBZSxHQUFHLGNBQWMsRUFBRSxDQUFDO0FBQ25DLFFBQUEsZUFBZSxHQUFHLGNBQWMsRUFBRSxDQUFDO0FBQ25DLFFBQUEsbUJBQW1CLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztBQUMzQyxRQUFBLG9CQUFvQixHQUFHLDBCQUEwQixFQUFFLENBQUM7QUFDcEQsUUFBQSxZQUFZLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQyJ9