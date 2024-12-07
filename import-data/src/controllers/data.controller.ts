import { productsService } from '../services/services'
import { execute } from '../helpers'
import { deleteAllCarts } from '../controllers/carts.controller'
import {
  deleteAllCategories,
  importCategories
} from '../controllers/categories.controller'
import { deleteChannels, importChannels } from '../controllers/channels.controller'
import {
  deleteAllCustomers,
  deleteCustomerGroups,
  importCustomerGroups,
  importCustomers
} from '../controllers/customers.controller'
import { deleteInventory, importInventory } from '../controllers/inventory.controller'
import { deleteAllLineItemStates, importLineItemStates } from '../controllers/lineItemStates.controller'
import { deleteAllOrders, importOrders } from '../controllers/orders.controller'
import {
  deleteAllProducts,
  importProductTypes,
  importProducts,
  deleteAllProductTypes
} from '../controllers/products.controller'
import {
  deleteAllShippingMethods,
  importShippingMethods
} from '../controllers/shippingMethod.controller'
import {
  deleteTaxCategories,
  importTaxCategories
} from '../controllers/taxCategory.controller'
import { deleteTypes, importTypes } from '../controllers/types.controller'
import { deleteAllZones, importZones } from '../controllers/zones.controller'
import { importProjectData } from '../controllers/projects.controller'
import {
  deleteAllProductDiscounts,
  importProductDiscounts
} from '../controllers/productDiscount.controller'
import { deleteStores, importStores } from './stores.controller'
import { importProductStates } from './productStates.controller'

const nconf = require('nconf')
const later = (time: number | undefined, arg?: unknown) =>
  new Promise((r) => setTimeout(() => r(arg), time))
const updateOrders = () => {
  const WAIT_TIME = 15000
  const recur: any = ([toUpdate, index]: any) => {
    if (index >= toUpdate.length) {
      return
    }
    return execute({
      uri: productsService.build(),
      method: 'GET'
    }).then((result) => {
      const productToUpdate = result?.body?.results.find(
        (p: { masterData: { current: { masterVariant: { sku: any } } } }) =>
          p.masterData.current.masterVariant.sku ===
          toUpdate[index]
      )
      if (!productToUpdate) {
        return later(WAIT_TIME, [toUpdate, index]).then(
          recur
        )
      }
      return later(WAIT_TIME)
        .then(() =>
          execute({
            uri: productsService
              .byId(productToUpdate.id)
              .build(),
            method: 'POST',
            body: {
              version: productToUpdate.version,
              actions: [
                {
                  action: 'setDescription',
                  description:
                    productToUpdate.masterData.current.name,
                  staged: false
                }
              ]
            }
          })
        )
        .then(() => later(WAIT_TIME))
        .then(() => recur([toUpdate, index + 1]))
    })
  }
  // eslint-disable-next-line no-console
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Updating products (this could take a minute)'
  )
  return recur([['M0E20000000ELAJ', 'M0E20000000ELBX'], 0])
}

const taskReducer = (result: Promise<any>, fn: any) => result.then(fn)

const deleteAllData = () => {
  // eslint-disable-next-line no-console
  console.log('--Deleting all project data--')
  return [
    deleteAllProductDiscounts,
    deleteAllProducts,
    deleteAllProductTypes,
    deleteAllCategories,
    deleteInventory,
    deleteAllOrders,
    deleteAllCarts,
    deleteAllLineItemStates,
    deleteAllCustomers,
    deleteCustomerGroups,
    deleteStores,
    deleteAllShippingMethods,
    deleteAllZones,
    deleteTaxCategories,
    deleteChannels,
    deleteTypes,
    deleteAllOrders
  ].reduce(taskReducer, Promise.resolve())
}

export const importAllData = () => {
  // eslint-disable-next-line no-console
  console.log('--Importing all project data--')
  return [
    importProjectData,
    importTaxCategories,
    importTypes,
    importProductTypes,
    importCategories,
    importZones,
    importShippingMethods,
    importChannels,
    importLineItemStates,
    importProductStates,
    importCustomerGroups,
    importCustomers,
    importProducts,
    importStores,
    importProductDiscounts,
  ].reduce(taskReducer, Promise.resolve())
}

export const deleteAndImport = () =>
  [
    deleteAllData, // delete
    importAllData, // create
    // updateOrders // update orders so last update is set correctly
  ].reduce(taskReducer, Promise.resolve())

if (nconf.get('all:clean')) {
  deleteAllData().then(() =>
    // eslint-disable-next-line no-console
    console.log('--The project data is deleted--')
  )
} else if (nconf.get('all:import')) {
  importAllData().then(() =>
    // eslint-disable-next-line no-console
    console.log('--All data is imported--')
  )
} else if (nconf.get('start')) {
  deleteAndImport().then(() =>
    // eslint-disable-next-line no-console
    console.log('--All data is imported--')
  )
}
