
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
    
  productStatesRouter.post('/hello', async(req, res, next)=>{
    logger.info('Importing product states n message received');
    try {
        res.send("HELLOOOO 1st");
      } catch (error) {
        next(error);
      }
    });

  productStatesRouter.post('/hello-world', async(req, res, next)=>{
    logger.info('Importing product states n message received');
    try {
        res.send("HELLLLO WORLD !!!!!");
      } catch (error) {
        next(error);
      }
    });


export default productStatesRouter;

