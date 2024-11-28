import * as dotenv from 'dotenv';
dotenv.config();

import express, {Express} from 'express';
import bodyParser from 'body-parser';

// Import routes


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


app.use('/stores', storeRouter);

// app.use('*', () => {
//   throw new CustomError(404, 'Path not found.');
// });
// // Global error handler
// app.use(errorMiddleware);

export default app;
