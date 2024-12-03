import { config } from '../config';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createRequestBuilder } from '@commercetools/api-request-builder';
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
  createRequestBuilder({ projectKey: config.projectKey })
    .channels

const createCustomerGroupService = () =>
  createRequestBuilder({ projectKey: config.projectKey })
    .customerGroups

const createProductTypes = () =>
  createRequestBuilder({ projectKey: config.projectKey })
    .productTypes

const createProducts = () =>
  createRequestBuilder({ projectKey: config.projectKey })
    .products

export const channelsService = createChannels()
export const customerGroupService = createCustomerGroupService()

export const productTypesService = createProductTypes()
export const productsService = createProducts()





