
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importProducts, importProductTypes } from '../controllers/products.controller';

const productRouter = Router();

productRouter.post('/', async(req, res, next)=>{
    logger.info('Importing products message received');
    try {
        logger.info('Create products try block');
        await importProductTypes();
        await importProducts();
        res.send("importing products successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default productRouter;

