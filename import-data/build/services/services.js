"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesService = exports.taxService = exports.projectService = exports.productDiscountService = exports.stateService = exports.productsService = exports.productTypesService = exports.customerGroupService = exports.channelsService = exports.typesService = exports.shippingMethodService = exports.zonesService = exports.inventoryService = exports.customersService = exports.cartsService = exports.ordersImportService = exports.ordersService = exports.storeService = exports.client = void 0;
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
const createChannels = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).channels;
const createCustomerGroupService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).customerGroups;
const createProductTypes = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).productTypes;
const createProducts = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).products;
const createStatesService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).states;
const createProductDiscount = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).productDiscounts;
const createProjectService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).project;
const createTaxService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).taxCategories;
const createTypes = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).types;
const createCategories = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).categories;
const createZonesService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).zones;
const createShippingMethodsService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).shippingMethods;
const createInventory = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).inventory;
const createCustomersService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).customers;
const createCarts = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).carts;
const createOrders = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).orders;
const importOrders = () => (0, api_request_builder_1.createRequestBuilder)({
    projectKey: config_1.config.projectKey,
    customServices: {
        orders: {
            type: 'orders',
            endpoint: '/orders/import',
            features: [api_request_builder_1.features.query, api_request_builder_1.features.queryOne],
        },
    },
}).orders;
const createStoreService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).stores;
exports.storeService = createStoreService();
exports.ordersService = createOrders();
exports.ordersImportService = importOrders();
exports.cartsService = createCarts();
exports.customersService = createCustomersService();
exports.inventoryService = createInventory();
exports.zonesService = createZonesService();
exports.shippingMethodService = createShippingMethodsService();
exports.typesService = createTypes();
exports.channelsService = createChannels();
exports.customerGroupService = createCustomerGroupService();
exports.productTypesService = createProductTypes();
exports.productsService = createProducts();
exports.stateService = createStatesService();
exports.productDiscountService = createProductDiscount();
exports.projectService = createProjectService();
exports.taxService = createTaxService();
exports.categoriesService = createCategories();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW1DO0FBQ25DLDBEQUF5RDtBQUN6RCw0RUFBa0c7QUFDbEcsNEVBQTBFO0FBQzFFLDRFQUc0QztBQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0IsUUFBQSxNQUFNLEdBQUcsSUFBQSx5QkFBWSxFQUFDO0lBQ2pDLGdEQUFnRDtJQUNoRCxXQUFXLEVBQUU7UUFDWCxJQUFBLGtFQUE0QyxFQUFDO1lBQzNDLElBQUksRUFBRSxlQUFNLENBQUMsT0FBTztZQUNwQixVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVU7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxlQUFNLENBQUMsUUFBUTtnQkFDekIsWUFBWSxFQUFFLGVBQU0sQ0FBQyxZQUFZO2FBQ2xDO1NBQ0YsQ0FBQztRQUNGLElBQUEsMENBQW9CLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUNyRDtDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUMxQixJQUFBLDBDQUFvQixFQUFDLEVBQUUsVUFBVSxFQUFFLGVBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUVuRSxNQUFNLDBCQUEwQixHQUFHLEdBQUcsRUFBRSxDQUN0QyxJQUFBLDBDQUFvQixFQUFDLEVBQUUsVUFBVSxFQUFFLGVBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUV6RSxNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUM5QixJQUFBLDBDQUFvQixFQUFDLEVBQUUsVUFB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