
import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { importChannels } from '../controllers/channels.controller';

const channelRouter = Router();

channelRouter.post('/', async(req, res, next)=>{
    logger.info('Importing channels message received');
    try {
        logger.info('Create channel try block');
        await importChannels();
        console.log("------------------------------------", process.env.CHANNEL_JSON_PATH)
        res.send("importing channel successfully!!");
      } catch (error) {
        next(error);
      }
    });
    


export default channelRouter;

