
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importCustomers } from '../controllers/customers.controller';

const customerRouter = Router();

customerRouter.post('/', async(req, res, next)=>{
    logger.info('Importing customer message received');
    try {
        logger.info('Create customer try block');
        await importCustomers();
        res.send("importing customer successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default customerRouter;

