import { cartsService } from '../services/services'
import { createStandardDelete } from '../helpers'
const nconf = require('nconf')

export const deleteAllCarts = createStandardDelete({
  itemName: 'carts',
  service: cartsService
})

if (nconf.get('clean')) {
  deleteAllCarts()
}
