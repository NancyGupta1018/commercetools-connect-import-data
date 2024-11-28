import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes

import categoriesRouter from './routes/categories.route';
import channelRouter from './routes/channels.route';
import { readConfiguration } from './utils/config.utils';
import storeRouter from './routes/stores.routes';

// Read env variables
readConfiguration();

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/category', categoriesRouter);
app.use('/channel', channelRouter);
app.use('/stores', storeRouter);

// app.use('*', () => {
//   throw new CustomError(404, 'Path not found.');
// });
// // Global error handler
// app.use(errorMiddleware);

export default app;
