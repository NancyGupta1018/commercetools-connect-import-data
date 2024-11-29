
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importProjectData } from '../controllers/projects.controller';

const projectRouter = Router();

projectRouter.post('/', async(req, res, next)=>{
    logger.info('Importing projects message received');
    try {
        logger.info('Create project data try block');
        await importProjectData();
        res.send("importing project data successfully!!");
      } catch (error) {
        next(error);
      }
    });
    

export default projectRouter;

