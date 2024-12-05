import { config } from '../config';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import {
  features,
  createRequestBuilder,
} from '@commercetools/api-request-builder';
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

export const client = createClient({
  // The order of the middlewares is important !!!
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: config.authUrl,
      projectKey: config.projectKey,
      credentials: {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
      },
    }),
    createHttpMiddleware({ host: config.apiUrl, fetch }),
  ],
});

const createChannels = () =>
  createRequestBuilder({ projectKey: config.projectKey }).channels;

const createCustomerGroupService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).customerGroups;

const createProductTypes = () =>
  createRequestBuilder({ projectKey: config.projectKey }).productTypes;

const createProducts = () =>
  createRequestBuilder({ projectKey: config.projectKey }).products;

const createStatesService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).states;

const createProductDiscount = () =>
  createRequestBuilder({ projectKey: config.projectKey }).productDiscounts;

const createProjectService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).project;

const createTaxService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).taxCategories;

const createTypes = () =>
  createRequestBuilder({ projectKey: config.projectKey }).types;

const createCategories = () =>
  createRequestBuilder({ projectKey: config.projectKey }).categories;

const createZonesService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).zones;

const createShippingMethodsService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).shippingMethods;

const createInventory = () =>
  createRequestBuilder({ projectKey: config.projectKey }).inventory;

const createCustomersService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).customers;

const createCarts = () =>
  createRequestBuilder({ projectKey: config.projectKey }).carts;

const createOrders = () =>
  createRequestBuilder({ projectKey: config.projectKey }).orders;
const importOrders = () =>
  createRequestBuilder({
    projectKey: config.projectKey,
    customServices: {
      orders: {
        type: 'orders',
        endpoint: '/orders/import',
        features: [features.query, features.queryOne],
      },
    },
  }).orders;

const createStoreService = () =>
  createRequestBuilder({ projectKey: config.projectKey }).stores;

export const storeService = createStoreService();

export const ordersService = createOrders();
export const ordersImportService = importOrders();

export const cartsService = createCarts();

export const customersService = createCustomersService();

export const inventoryService = createInventory();

export const zonesService = createZonesService();

export const shippingMethodService = createShippingMethodsService();

export const typesService = createTypes();

export const channelsService = createChannels();

export const customerGroupService = createCustomerGroupService();

export const productTypesService = createProductTypes();

export const productsService = createProducts();

export const stateService = createStatesService();

export const productDiscountService = createProductDiscount();

export const projectService = createProjectService();

export const taxService = createTaxService();

export const categoriesService = createCategories();
