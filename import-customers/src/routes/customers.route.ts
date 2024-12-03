
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importCustomerGroups, importCustomers } from '../controllers/customers.controller';

const customerRouter = Router();

customerRouter.post('/', async(req, res, next)=>{
    logger.info('Importing customer message received');
    try {
        logger.info('Create customer try block');
        await importCustomers();
        await importCustomerGroups();
        res.send("importing customer and customer groups successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default customerRouter;

