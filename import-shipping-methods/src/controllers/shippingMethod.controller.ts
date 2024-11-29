import {
  shippingMethodService,
  taxService,
  zonesService
} from '../services/services';
import {
  logAndExit,
  execute,
  createStandardDelete
} from '../helpers';
// import * as nconf from 'nconf';

// Define types for responses and data structure
interface TaxCategory {
  id: string;
  name: string;
}

interface Zone {
  id: string;
  name: string;
}

interface ShippingMethod {
  taxCategory: {
    id: string;
  };
  zoneRates: Array<{
    zone: {
      id: string;
    };
  }>;
}

interface ApiResponse<T> {
  body: {
    results: T[];
  };
}

const shippingMethods: ShippingMethod[] = require(
  process.cwd() + '/src/data/shipping-methods.json');

// Function to get tax categories
const getTaxCategories = (): Promise<ApiResponse<TaxCategory>> =>
  execute({
    uri: taxService.build(),
    method: 'GET'
  });

// Function to get zones
const getZones = (): Promise<ApiResponse<Zone>> =>
  execute({
    uri: zonesService.build(),
    method: 'GET'
  });

// Function to add shipping methods
const addShippingMethods = (
  taxCategoriesByName: { [key: string]: TaxCategory },
  zonesForName: { [key: string]: Zone }
): Promise<void[]> =>
  Promise.all(
    shippingMethods.map((shippingMethod) => {
      // Check tax category existence
      const standardTaxCategory = taxCategoriesByName['standard'];
      if (!standardTaxCategory) {
        throw new Error('Standard tax category not found');
      }
      shippingMethod.taxCategory.id = standardTaxCategory.id;

      // Ensure zones exist
      shippingMethod.zoneRates.forEach((zoneRate) => {
        const zone = zonesForName[zoneRate.zone.id];
        if (!zone) {
          throw new Error(`Zone with ID ${zoneRate.zone.id} not found`);
        }
        zoneRate.zone.id = zone.id;
      });

      const uri = shippingMethodService.build();
      return execute({
        uri,
        method: 'POST',
        body: shippingMethod
      });
    })
  );



// Function to delete all shipping methods
export const deleteAllShippingMethods = createStandardDelete({
  itemName: 'shipping methods',
  service: shippingMethodService
});

// Function to import shipping methods
export async function importShippingMethods(): Promise<void> {
  try {
    const taxCategories = await getTaxCategories();
    const taxCategoriesByName = taxCategories.body.results.reduce(
      (obj: { [key: string]: TaxCategory }, taxCategory: TaxCategory) => {
        obj[taxCategory.name] = taxCategory;
        return obj;
      },
      {}
    );

    const zones = await getZones();
    const zonesForName = zones.body.results.reduce(
      (obj: { [key: string]: Zone }, zone: Zone) => {
        obj[zone.name] = zone;
        return obj;
      },
      {}
    );

    await addShippingMethods(taxCategoriesByName, zonesForName);
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Shipping methods imported');
  } catch (error) {
    return logAndExit(error, 'Failed to import shipping methods');
  }
}

// // Main logic for clean or import actions based on configuration
// if (nconf.get('clean')) {
//   deleteAllShippingMethods();
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing shipping methods...');
//   importShippingMethods();
// }
