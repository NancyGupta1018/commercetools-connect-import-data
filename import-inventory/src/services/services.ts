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



const createInventory = () =>
  createRequestBuilder({ projectKey: config.projectKey })
    .inventory


export const inventoryService = createInventory()



