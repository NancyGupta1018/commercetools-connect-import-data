import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importStores } from '../controllers/stores.controller';

const storeRouter = Router();

storeRouter.post('/', async (req, res, next) => {
  logger.info('Importing stores message received');
  try {
    logger.info('stores router try block');
    await importStores();
    res.send('importing stores successfully!!');
  } catch (error) {
    next(error);
  }
});

export default storeRouter;
