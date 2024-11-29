
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importTypes } from '../controllers/types.controller';

const typesRouter = Router();

typesRouter.post('/', async(req, res, next)=>{
    logger.info('Importing types message received');
    try {
        logger.info('Create types try block');
        await importTypes();
        res.send("importing types successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default typesRouter;

