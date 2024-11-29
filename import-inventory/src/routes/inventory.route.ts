
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importInventory } from '../controllers/inventory.controller';

const inventoryRouter = Router();

inventoryRouter.post('/', async(req, res, next)=>{
    logger.info('Importing inventory message received');
    try {
        logger.info('Create inventory try block');
        await importInventory(process.env.INVENTORY_FILE_PATH, process.env.INVENTORY_STORES_FILE_PATH);
        res.send("importing inventory successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default inventoryRouter;

