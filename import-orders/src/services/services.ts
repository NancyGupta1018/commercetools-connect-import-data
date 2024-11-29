import { config } from '../config';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { features, createRequestBuilder } from '@commercetools/api-request-builder';
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



const createOrders = () =>
  createRequestBuilder({ projectKey: config.projectKey })
    .orders
const importOrders = () =>
  createRequestBuilder({
    projectKey: config.projectKey,
    customServices: {
      orders: {
        type: 'orders',
        endpoint: '/orders/import',
        features: [features.query, features.queryOne]
      }
    }
  }).orders

export const ordersService = createOrders()
export const ordersImportService = importOrders()


