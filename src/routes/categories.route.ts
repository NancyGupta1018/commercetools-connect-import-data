
import { Router } from 'express';

import { importCategories } from '../controllers/categories.controller';
import { logger } from '../utils/logger.utils';

const categoriesRouter = Router();
// categoriesRouter.get('/',(req,res)=>{
//   res.send("hi")
// })
categoriesRouter.post('/', async(req, res, next)=>{
    logger.info('Create Categories message received');
    try {
        
        await importCategories();
        res.send("Hello");
      } catch (error) {
        next(error);
      }
    });
    


export default categoriesRouter;

