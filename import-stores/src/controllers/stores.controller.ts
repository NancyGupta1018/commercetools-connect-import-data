import { storeService } from '../services/services'
import {
  logAndExit,
  execute,
  createStandardDelete
} from '../helpers'

export const importStores = () =>
  Promise.all(
    [require(process.cwd() + '/src/data/stores.json')].map(
      (type) =>
        Promise.all(
          type.map((element: any) =>
            execute({
              uri: storeService.build(),
              method: 'POST',
              body: element
            })
          )
        )
    )
  )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log('\x1b[32m%s\x1b[0m', 'Types imported')
    )
    .catch((err) =>
      logAndExit(err, 'Failed to import channel types')
    )

export const deleteStores = createStandardDelete({
  itemName: 'stores',
  service: storeService
})
