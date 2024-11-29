"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllShippingMethods = void 0;
exports.importShippingMethods = importShippingMethods;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const shippingMethods = require(process.cwd() + '/src/data/shipping-methods.json');
// Function to get tax categories
const getTaxCategories = () => (0, helpers_1.execute)({
    uri: services_1.taxService.build(),
    method: 'GET'
});
// Function to get zones
const getZones = () => (0, helpers_1.execute)({
    uri: services_1.zonesService.build(),
    method: 'GET'
});
// Function to add shipping methods
const addShippingMethods = (taxCategoriesByName, zonesForName) => Promise.all(shippingMethods.map((shippingMethod) => {
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
    const uri = services_1.shippingMethodService.build();
    return (0, helpers_1.execute)({
        uri,
        method: 'POST',
        body: shippingMethod
    });
}));
// Function to delete all shipping methods
exports.deleteAllShippingMethods = (0, helpers_1.createStandardDelete)({
    itemName: 'shipping methods',
    service: services_1.shippingMethodService
});
// Function to import shipping methods
function importShippingMethods() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const taxCategories = yield getTaxCategories();
            const taxCategoriesByName = taxCategories.body.results.reduce((obj, taxCategory) => {
                obj[taxCategory.name] = taxCategory;
                return obj;
            }, {});
            const zones = yield getZones();
            const zonesForName = zones.body.results.reduce((obj, zone) => {
                obj[zone.name] = zone;
                return obj;
            }, {});
            yield addShippingMethods(taxCategoriesByName, zonesForName);
            // eslint-disable-next-line no-console
            console.log('\x1b[32m%s\x1b[0m', 'Shipping methods imported');
        }
        catch (error) {
            return (0, helpers_1.logAndExit)(error, 'Failed to import shipping methods');
        }
    });
}
// // Main logic for clean or import actions based on configuration
// if (nconf.get('clean')) {
//   deleteAllShippingMethods();
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing shipping methods...');
//   importShippingMethods();
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdNZXRob2QuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9zaGlwcGluZ01ldGhvZC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWtHQSxzREEwQkM7QUE1SEQsbURBSThCO0FBQzlCLHdDQUlvQjtBQStCcEIsTUFBTSxlQUFlLEdBQXFCLE9BQU8sQ0FDL0MsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLGlDQUFpQyxDQUFDLENBQUM7QUFFckQsaUNBQWlDO0FBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBc0MsRUFBRSxDQUMvRCxJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUscUJBQVUsQ0FBQyxLQUFLLEVBQUU7SUFDdkIsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFFTCx3QkFBd0I7QUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBK0IsRUFBRSxDQUNoRCxJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsdUJBQVksQ0FBQyxLQUFLLEVBQUU7SUFDekIsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFFTCxtQ0FBbUM7QUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxDQUN6QixtQkFBbUQsRUFDbkQsWUFBcUMsRUFDcEIsRUFBRSxDQUNuQixPQUFPLENBQUMsR0FBRyxDQUNULGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtJQUNyQywrQkFBK0I7SUFDL0IsTUFBTSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztJQUV2RCxxQkFBcUI7SUFDckIsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUM1QyxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxnQ0FBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQyxPQUFPLElBQUEsaUJBQU8sRUFBQztRQUNiLEdBQUc7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxjQUFjO0tBQ3JCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7QUFJSiwwQ0FBMEM7QUFDN0IsUUFBQSx3QkFBd0IsR0FBRyxJQUFBLDhCQUFvQixFQUFDO0lBQzNELFFBQVEsRUFBRSxrQkFBa0I7SUFDNUIsT0FBTyxFQUFFLGdDQUFxQjtDQUMvQixDQUFDLENBQUM7QUFFSCxzQ0FBc0M7QUFDdEMsU0FBc0IscUJBQXFCOztRQUN6QyxJQUFJLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLGdCQUFnQixFQUFFLENBQUM7WUFDL0MsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzNELENBQUMsR0FBbUMsRUFBRSxXQUF3QixFQUFFLEVBQUU7Z0JBQ2hFLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUNwQyxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUM1QyxDQUFDLEdBQTRCLEVBQUUsSUFBVSxFQUFFLEVBQUU7Z0JBQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FBQztZQUVGLE1BQU0sa0JBQWtCLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDNUQsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sSUFBQSxvQkFBVSxFQUFDLEtBQUssRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCxtRUFBbUU7QUFDbkUsNEJBQTRCO0FBQzVCLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLHVFQUF1RTtBQUN2RSw2QkFBNkI7QUFDN0IsSUFBSSJ9