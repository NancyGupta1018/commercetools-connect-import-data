
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importShippingMethods } from '../controllers/shippingMethod.controller';

const shippingMethodRouter = Router();

shippingMethodRouter.post('/', async(req, res, next)=>{
    logger.info('Importing shipping method message received');
    try {
        logger.info('Create shipping-method try block');
        await importShippingMethods();
        res.send("importing shipping-method successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default shippingMethodRouter;

