
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { deleteAllCarts } from '../controllers/carts.controller';

const cartsRouter = Router();

cartsRouter.post('/', async(req, res, next)=>{
    logger.info('Deleting carts message received');
    try {
        logger.info('Delete carts try block');
        await deleteAllCarts();
        res.send("deleting carts successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default cartsRouter;

