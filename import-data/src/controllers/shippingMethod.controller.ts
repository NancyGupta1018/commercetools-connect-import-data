import {
  shippingMethodService,
  taxService,
  zonesService
} from '../services/services'
import {
  logAndExit,
  execute,
  createStandardDelete
} from '../helpers'
// const nconf = require('nconf')
const shippingMethods = require(process.cwd() +
  '/src/data/shipping-methods.json')

const getTaxCategories = () =>
  execute({
    uri: taxService.build(),
    method: 'GET'
  })

const getZones = () =>
  execute({
    uri: zonesService.build(),
    method: 'GET'
  })

const addShippingMethods = (
  taxCategoriesByName: { [x: string]: { id: any } },
  zonesForName: { [x: string]: { id: any } }
) =>
  Promise.all(
    
    shippingMethods.map((shippingMethod: { taxCategory: { id: any }; zoneRates: any[] }) => {
      shippingMethod.taxCategory.id =
        taxCategoriesByName['standard'].id


        console.log(taxCategoriesByName);
        console.log(zonesForName);
        
      shippingMethod.zoneRates.forEach((zoneRate: { zone: { id: string | number } }) => {
        zoneRate.zone.id = zonesForName[zoneRate.zone.id].id
      })
      
      const uri = shippingMethodService.build()
      return execute({
        uri,
        method: 'POST',
        body: shippingMethod
      })
    })
  )

export const deleteAllShippingMethods = createStandardDelete(
  {
    itemName: 'shipping methods',
    service: shippingMethodService
  }
)

export async function importShippingMethods () {
  try {
    const taxCategories = await getTaxCategories()
    const taxCategoriesByName = taxCategories.body.results.reduce(
      (obj: { [x: string]: any }, taxCategory: { name: string | number }) => {
        obj[taxCategory.name] = taxCategory
        return obj
      },
      {}
    )

    const zones = await getZones()
    const zonesForName = zones.body.results.reduce(
      (obj: { [x: string]: any }, zone: { name: string | number }) => {
        obj[zone.name] = zone
        return obj
      },
      {}
    )
    return await addShippingMethods(
      taxCategoriesByName,
      zonesForName
    ).then(() =>
      // eslint-disable-next-line no-console
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Shipping methods imported'
      )
    )
  } catch (error) {
    return logAndExit(
      error,
      'Failed to iport shipping methods'
    )
  }
}

// if (nconf.get('clean')) {
//   deleteAllShippingMethods()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log(
//     '\x1b[32m%s\x1b[0m',
//     'Importing shipping methods...'
//   )
//   importShippingMethods()
// }
