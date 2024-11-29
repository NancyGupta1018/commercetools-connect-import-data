
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importLineItemStates } from '../controllers/lineItemStates.controller';

const lineItemRouter = Router();

lineItemRouter.post('/', async(req, res, next)=>{
    logger.info('Importing lineItem message received');
    try {
        logger.info('Create lineItem try block');
        await importLineItemStates();
        res.send("importing lineItem successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default lineItemRouter;

