"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importInventory = exports.deleteInventory = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const csvtojson_1 = __importDefault(require("csvtojson"));
const cli_progress_1 = require("cli-progress");
require('dotenv').config();
// const nconf = require('nconf')
exports.deleteInventory = (0, helpers_1.createStandardDelete)({
    itemName: 'inventory',
    service: services_1.inventoryService
});
const importInventory = (inventoryPath = process.env.INVENTORY_FILE_PATH || './data/inventory.csv', inventoryStoresPath = process.env.INVENTORY_STORES_FILE_PATH || './data/inventory-stores.csv') => Promise.all([
    (0, csvtojson_1.default)().fromFile(inventoryPath),
    (0, csvtojson_1.default)().fromFile(inventoryStoresPath)
]).then(([inventory, inventoryStores]) => {
    const notifySave = new cli_progress_1.SingleBar({
        format: 'Save inventory      {bar} |' +
            '| {percentage}% || {value}/{total} items',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591'
    }, cli_progress_1.Presets.rect);
    const all = inventory.concat(inventoryStores);
    notifySave.start(all.length, 0, {});
    let processed = 0;
    return Promise.all(all
        .map(({ sku, quantityOnStock, supplyChannel }) => {
        const supply = supplyChannel
            ? { supplyChannel: { key: supplyChannel } }
            : {};
        return Object.assign({ sku, quantityOnStock: Number(quantityOnStock) }, supply);
    })
        .map((inventory) => {
        return (0, helpers_1.execute)({
            uri: services_1.inventoryService.build(),
            method: 'POST',
            body: inventory
        }).then(() => notifySave.update(++processed));
    })).then(() => notifySave.stop(), (err) => {
        notifySave.stop();
        return (0, helpers_1.logAndExit)(err, 'Failed to import inventory');
    });
});
exports.importInventory = importInventory;
// if (nconf.get('clean')) {
//   deleteInventory()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing inventory...')
//   importInventory()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvaW52ZW50b3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQXVEO0FBQ3ZELHdDQUltQjtBQUNuQiwwREFBMkI7QUFDM0IsK0NBQWlEO0FBR2pELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUMxQixpQ0FBaUM7QUFFcEIsUUFBQSxlQUFlLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUNsRCxRQUFRLEVBQUUsV0FBVztJQUNyQixPQUFPLEVBQUUsMkJBQWdCO0NBQzFCLENBQUMsQ0FBQTtBQUdLLE1BQU0sZUFBZSxHQUFHLENBQUMsZ0JBQXdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksc0JBQXNCLEVBQy9HLHNCQUErQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLDZCQUE2QixFQUN0RyxFQUFFLENBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNWLElBQUEsbUJBQUcsR0FBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDN0IsSUFBQSxtQkFBRyxHQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLElBQUksd0JBQVMsQ0FDOUI7UUFDRSxNQUFNLEVBQ0osNkJBQTZCO1lBQzdCLDBDQUEwQztRQUM1QyxlQUFlLEVBQUUsUUFBUTtRQUN6QixpQkFBaUIsRUFBRSxRQUFRO0tBQzVCLEVBQ0Qsc0JBQU8sQ0FBQyxJQUFJLENBQ2IsQ0FBQTtJQUNELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDN0MsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNuQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUE7SUFDakIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixHQUFHO1NBQ0EsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUU7UUFDL0MsTUFBTSxNQUFNLEdBQUcsYUFBYTtZQUMxQixDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEVBQUU7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUNOLHVCQUNFLEdBQUcsRUFDSCxlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUNyQyxNQUFNLEVBQ1Y7SUFDSCxDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNqQixPQUFPLElBQUEsaUJBQU8sRUFBQztZQUNiLEdBQUcsRUFBRSwyQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7WUFDN0IsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBQy9DLENBQUMsQ0FBQyxDQUNMLENBQUMsSUFBSSxDQUNKLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFDdkIsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNOLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNqQixPQUFPLElBQUEsb0JBQVUsRUFBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsQ0FBQTtJQUN0RCxDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBOUNTLFFBQUEsZUFBZSxtQkE4Q3hCO0FBRUosNEJBQTRCO0FBQzVCLHNCQUFzQjtBQUN0QixvQ0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLCtEQUErRDtBQUMvRCxzQkFBc0I7QUFDdEIsSUFBSSJ9