import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import {
  importProducts,
  importProductTypes,
} from '../controllers/products.controller';
import { importProductStates } from '../controllers/productStates.controller';
import { importProductDiscounts } from '../controllers/productDiscount.controller';
import { importProjectData } from '../controllers/projects.controller';
import { importTaxCategories } from '../controllers/taxCategory.controller';
import { importTypes } from '../controllers/types.controller';
import { importCategories } from '../controllers/categories.controller';
import { importZones } from '../controllers/zones.controller';
import { importShippingMethods } from '../controllers/shippingMethod.controller';
import { importChannels } from '../controllers/channels.controller';
import { importLineItemStates } from '../controllers/lineItemStates.controller';
import { importInventory } from '../controllers/inventory.controller';
import {
  importCustomerGroups,
  importCustomers,
} from '../controllers/customers.controller';
import { deleteAllCarts } from '../controllers/carts.controller';
import { importOrders } from '../controllers/orders.controller';
import { importStores } from '../controllers/stores.controller';

const dataRouter = Router();

dataRouter.post('/project', async (req, res, next) => {
  logger.info('Importing projects message received');
  try {
    logger.info('Create project data try block');
    await importProjectData();
    res.send('importing project data successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/tax-categories', async (req, res, next) => {
  logger.info('Importing tax category message received');
  try {
    logger.info('Create tax category try block');
    await importTaxCategories();
    res.send('importing tax-categories successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/types', async (req, res, next) => {
  logger.info('Importing types message received');
  try {
    logger.info('Create types try block');
    await importTypes();
    res.send('importing types successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/product-types', async (req, res, next) => {
  logger.info('Importing product type message received');
  try {
    logger.info('Create product-types try block');
    await importProductTypes();
    res.send('importing product types successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/categories', async (req, res, next) => {
  logger.info('Create Categories message received');
  try {
    logger.info('Create Categories try block');
    await importCategories(process.env.CSV_FILE_PATH);
    res.send('importing categories successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/zones', async (req, res, next) => {
  logger.info('Importing zones message received');
  try {
    logger.info('Create zones try block');
    await importZones();
    res.send('importing zones successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/shipping-methods', async (req, res, next) => {
  logger.info('Importing shipping method message received');
  try {
    logger.info('Create shipping-method try block');
    await importShippingMethods();
    res.send('importing shipping-method successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/channel', async (req, res, next) => {
  logger.info('Importing channels message received');
  try {
    logger.info('Create channel try block');
    await importChannels();
    res.send('importing channel successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/lineItem-states', async (req, res, next) => {
  logger.info('Importing lineItem message received');
  try {
    logger.info('Create lineItem try block');
    await importLineItemStates();
    res.send('importing lineItem successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/product-states', async (req, res, next) => {
  logger.info('Importing product states n message received');
  try {
    logger.info('Create product states try block');
    await importProductStates();
    res.send('importing product states successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/products', async (req, res, next) => {
  logger.info('Importing products message received');
  try {
    logger.info('Create products try block');
    await importProducts();
    res.send('importing products successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/inventory', async (req, res, next) => {
  logger.info('Importing inventory message received');
  try {
    logger.info('Create inventory try block');
    await importInventory(
      process.env.INVENTORY_FILE_PATH,
      process.env.INVENTORY_STORES_FILE_PATH
    );
    res.send('importing inventory successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/product-discount', async (req, res, next) => {
  logger.info('Importing product discount message received');
  try {
    logger.info('Create product discount try block');
    await importProductDiscounts();
    res.send('importing product discount successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/customers', async (req, res, next) => {
  logger.info('Importing customer message received');
  try {
    logger.info('Create customer try block');
    await importCustomers();
    await importCustomerGroups();
    res.send('importing customer and customer groups successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/delete-carts', async (req, res, next) => {
  logger.info('Deleting carts message received');
  try {
    logger.info('Delete carts try block');
    await deleteAllCarts();
    res.send('deleting carts successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/orders', async (req, res, next) => {
  logger.info('Importing orders message received');
  try {
    logger.info('Create orders try block');
    await importOrders(process.env.ORDERS_CSV_FILE_PATH);
    res.send('importing orders successfully!!');
  } catch (error) {
    next(error);
  }
});

dataRouter.post('/stores', async (req, res, next) => {
  logger.info('Importing stores message received');
  try {
    logger.info('stores router try block');
    await importStores();
    res.send('importing stores successfully!!');
  } catch (error) {
    next(error);
  }
});

export default dataRouter;
