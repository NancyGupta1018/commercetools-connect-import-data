
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importZones } from '../controllers/zones.controller';

const zonesRouter = Router();

zonesRouter.post('/', async(req, res, next)=>{
    logger.info('Importing zones message received');
    try {
        logger.info('Create zones try block');
        await importZones();
        res.send("importing zones successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default zonesRouter;

