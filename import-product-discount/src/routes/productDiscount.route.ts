
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importProductDiscounts } from '../controllers/productDiscount.controller';

const productDiscountRouter = Router()

productDiscountRouter.post('/', async(req, res, next)=>{
    logger.info('Importing product discount message received');
    try {
        logger.info('Create product discount try block');
        await importProductDiscounts();
        res.send("importing product discount successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default productDiscountRouter;

