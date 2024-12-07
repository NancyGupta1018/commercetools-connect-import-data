import {
  ordersService,
  ordersImportService
} from '../services/services'
import {
  logAndExit,
  execute,
  createStandardDelete
} from '../helpers'
const nconf = require('nconf')

export const deleteAllOrders = createStandardDelete({
  itemName: 'orders',
  service: ordersService
})

const lineItemDraft = (item: any) => {
  return {
    name: {
      en: 'Product Name'
    },
    variant: {
      sku: item.lineitems.variant.sku
    },
    price: {
      value: {
        currencyCode: 'EUR',
        centAmount: item.lineitems.price * 100,
        fractionDigits: 2
      }
    },
    quantity: parseInt(item.lineitems.quantity)
  }
}

const orderDraft = (item: any) => {
  return {
    /* eslint quote-props: ["error", "consistent"] */
    customerEmail: item.customerEmail,
    orderNumber: item.orderNumber,
    lineItems: [
      {
        name: {
          en: 'Product Name'
        },
        variant: {
          sku: item.lineitems.variant.sku
        },
        price: {
          value: {
            currencyCode: 'EUR',
            centAmount: item.lineitems.price * 100,
            fractionDigits: 2
          }
        },
        quantity: parseInt(item.lineitems.quantity)
      }
    ],
    totalPrice: {
      currencyCode: 'EUR',
      centAmount: item.totalPrice * 100,
      fractionDigits: 2
    }
  }
}

export const importOrders = (
  OrdersCsvFilePath = process.env.ORDERS_CSV_FILE_PATH || '/src/data/orders.csv'
) =>
  require('csvtojson')()
    .fromFile(OrdersCsvFilePath)
    .then((rawJson: any) => [
      ...rawJson
        .reduce((result: any, item: any) => {
          const order = result.get(item.orderNumber)
          if (order) {
            order.lineItems.push(lineItemDraft(item))
            order.store = {
              typeId: 'store',
              key: 'default'
            }
            return result
          }
          return result.set(
            item.orderNumber,
            orderDraft(item)
          )
        }, new Map())
        .values()
    ])
    .then((orders: any) =>
      Promise.all(
        orders.map((order: any) =>
          execute({
            uri: ordersImportService.build(),
            method: 'POST',
            body: order
          })
        )
      )
    )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Orders imported')
    )
    .catch((err: any) =>
      logAndExit(err, 'Failed to import orders')
    )

if (nconf.get('clean')) {
  deleteAllOrders()
} else if (nconf.get('import')) {
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', 'Importing orders...')
  importOrders(nconf.get('csv'))
}
