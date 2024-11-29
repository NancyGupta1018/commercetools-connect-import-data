import { zonesService } from '../services/services'
import {
  logAndExit,
  execute,
  createStandardDelete
} from '../helpers'
// const nconf = require('nconf')

export const importZones = () =>
  Promise.all(
    require(process.cwd() + '/src/data/zones.json').map(
      (element: any) =>
        execute({
          uri: zonesService.build(),
          method: 'POST',
          body: element
        })
    )
  )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Zones imported')
    )
    .catch((error) =>
      logAndExit(error, 'Failed to import zones')
    )

export const deleteAllZones = createStandardDelete({
  itemName: 'zones',
  service: zonesService
})

// if (nconf.get('clean')) {
//   deleteAllZones()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing zones...')
//   importZones()
// }
