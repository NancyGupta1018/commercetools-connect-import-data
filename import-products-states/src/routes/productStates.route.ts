
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importProductStates } from '../controllers/productStates.controller';

const productStatesRouter = Router();

productStatesRouter.post('/', async(req, res, next)=>{
    logger.info('Importing product states n message received');
    try {
        logger.info('Create product states try block');
        await importProductStates();
        res.send("importing product states successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default productStatesRouter;

