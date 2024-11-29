
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importTaxCategories } from '../controllers/taxCategory.controller';

const taxCategoryRouter = Router();

taxCategoryRouter.post('/', async(req, res, next)=>{
    logger.info('Importing tax category message received');
    try {
        logger.info('Create tax category try block');
        await importTaxCategories();
        res.send("importing tax-categories successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default taxCategoryRouter;

