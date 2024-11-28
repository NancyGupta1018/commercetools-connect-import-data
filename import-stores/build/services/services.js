"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeService = exports.customerGroupService = exports.client = void 0;
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
const createCustomerGroupService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).customerGroups;
const createStoreService = () => (0, api_request_builder_1.createRequestBuilder)({ projectKey: config_1.config.projectKey }).stores;
exports.customerGroupService = createCustomerGroupService();
exports.storeService = createStoreService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQW1DO0FBQ25DLDBEQUF5RDtBQUN6RCw0RUFBa0c7QUFDbEcsNEVBQTBFO0FBQzFFLDRFQUc0QztBQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0IsUUFBQSxNQUFNLEdBQUcsSUFBQSx5QkFBWSxFQUFDO0lBQ2pDLGdEQUFnRDtJQUNoRCxXQUFXLEVBQUU7UUFDWCxJQUFBLGtFQUE0QyxFQUFDO1lBQzNDLElBQUksRUFBRSxlQUFNLENBQUMsT0FBTztZQUNwQixVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVU7WUFDN0IsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxlQUFNLENBQUMsUUFBUTtnQkFDekIsWUFBWSxFQUFFLGVBQU0sQ0FBQyxZQUFZO2FBQ2xDO1NBQ0YsQ0FBQztRQUNGLElBQUEsMENBQW9CLEVBQUMsRUFBRSxJQUFJLEVBQUUsZUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUNyRDtDQUNGLENBQUMsQ0FBQztBQUlILE1BQU0sMEJBQTBCLEdBQUcsR0FBRyxFQUFFLENBQ3RDLElBQUEsMENBQW9CLEVBQUMsRUFBRSxVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDO0FBRXpFLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFLENBQzlCLElBQUEsMENBQW9CLEVBQUMsRUFBRSxVQUFVLEVBQUUsZUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBRXBELFFBQUEsb0JBQW9CLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztBQUNwRCxRQUFBLFlBQVksR0FBRyxrQkFBa0IsRUFBRSxDQUFDIn0=