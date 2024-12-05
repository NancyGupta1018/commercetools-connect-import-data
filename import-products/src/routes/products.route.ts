
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importProducts, importProductTypes } from '../controllers/products.controller';
import { importProductStates } from '../controllers/productStates.controller';
import { importProductDiscounts } from '../controllers/productDiscount.controller';

const productRouter = Router();

productRouter.post('/create-products', async(req, res, next)=>{
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

    productRouter.post('/product-states', async(req, res, next)=>{
    logger.info('Importing product states n message received');
    try {
        logger.info('Create product states try block');
        await importProductStates();
        res.send("importing product states successfully!!");
      } catch (error) {
        next(error);
      }
    });


    productRouter.post('/product-discount', async(req, res, next)=>{
      logger.info('Importing product discount message received');
      try {
          logger.info('Create product discount try block');
          await importProductDiscounts();
          res.send("importing product discount successfully!!");
        } catch (error) {
          next(error);
        }
      });
      
      


export default productRouter;

