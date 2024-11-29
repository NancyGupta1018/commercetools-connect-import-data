
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importOrders } from '../controllers/orders.controller';

const orderRouter = Router();

orderRouter.post('/', async(req, res, next)=>{
    logger.info('Importing orders message received');
    try {
        logger.info('Create orders try block');
        await importOrders(process.env.ORDERS_CSV_FILE_PATH);
        res.send("importing orders successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default orderRouter;

