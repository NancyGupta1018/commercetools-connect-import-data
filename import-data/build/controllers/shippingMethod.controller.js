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
// const nconf = require('nconf')
const shippingMethods = require(process.cwd() +
    '/src/data/shipping-methods.json');
const getTaxCategories = () => (0, helpers_1.execute)({
    uri: services_1.taxService.build(),
    method: 'GET'
});
const getZones = () => (0, helpers_1.execute)({
    uri: services_1.zonesService.build(),
    method: 'GET'
});
const addShippingMethods = (taxCategoriesByName, zonesForName) => Promise.all(shippingMethods.map((shippingMethod) => {
    shippingMethod.taxCategory.id =
        taxCategoriesByName['standard'].id;
    console.log(taxCategoriesByName);
    console.log(zonesForName);
    shippingMethod.zoneRates.forEach((zoneRate) => {
        zoneRate.zone.id = zonesForName[zoneRate.zone.id].id;
    });
    const uri = services_1.shippingMethodService.build();
    return (0, helpers_1.execute)({
        uri,
        method: 'POST',
        body: shippingMethod
    });
}));
exports.deleteAllShippingMethods = (0, helpers_1.createStandardDelete)({
    itemName: 'shipping methods',
    service: services_1.shippingMethodService
});
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
            return yield addShippingMethods(taxCategoriesByName, zonesForName).then(() => 
            // eslint-disable-next-line no-console
            console.log('\x1b[32m%s\x1b[0m', 'Shipping methods imported'));
        }
        catch (error) {
            return (0, helpers_1.logAndExit)(error, 'Failed to iport shipping methods');
        }
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmdNZXRob2QuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9zaGlwcGluZ01ldGhvZC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQTREQSxzREFtQ0M7QUEvRkQsbURBSTZCO0FBQzdCLHdDQUltQjtBQUNuQixpQ0FBaUM7QUFDakMsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7SUFDM0MsaUNBQWlDLENBQUMsQ0FBQTtBQUVwQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUM1QixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUscUJBQVUsQ0FBQyxLQUFLLEVBQUU7SUFDdkIsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUE7QUFFSixNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FDcEIsSUFBQSxpQkFBTyxFQUFDO0lBQ04sR0FBRyxFQUFFLHVCQUFZLENBQUMsS0FBSyxFQUFFO0lBQ3pCLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFBO0FBRUosTUFBTSxrQkFBa0IsR0FBRyxDQUN6QixtQkFBaUQsRUFDakQsWUFBMEMsRUFDMUMsRUFBRSxDQUNGLE9BQU8sQ0FBQyxHQUFHLENBRVQsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQThELEVBQUUsRUFBRTtJQUNyRixjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDM0IsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFBO0lBR2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTVCLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBMkMsRUFBRSxFQUFFO1FBQy9FLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN0RCxDQUFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sR0FBRyxHQUFHLGdDQUFxQixDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3pDLE9BQU8sSUFBQSxpQkFBTyxFQUFDO1FBQ2IsR0FBRztRQUNILE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLGNBQWM7S0FDckIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQTtBQUVVLFFBQUEsd0JBQXdCLEdBQUcsSUFBQSw4QkFBb0IsRUFDMUQ7SUFDRSxRQUFRLEVBQUUsa0JBQWtCO0lBQzVCLE9BQU8sRUFBRSxnQ0FBcUI7Q0FDL0IsQ0FDRixDQUFBO0FBRUQsU0FBc0IscUJBQXFCOztRQUN6QyxJQUFJLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLGdCQUFnQixFQUFFLENBQUE7WUFDOUMsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzNELENBQUMsR0FBeUIsRUFBRSxXQUFzQyxFQUFFLEVBQUU7Z0JBQ3BFLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFBO2dCQUNuQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FBQTtZQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUE7WUFDOUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUM1QyxDQUFDLEdBQXlCLEVBQUUsSUFBK0IsRUFBRSxFQUFFO2dCQUM3RCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtnQkFDckIsT0FBTyxHQUFHLENBQUE7WUFDWixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUE7WUFDRCxPQUFPLE1BQU0sa0JBQWtCLENBQzdCLG1CQUFtQixFQUNuQixZQUFZLENBQ2IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1Ysc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEVBQ25CLDJCQUEyQixDQUM1QixDQUNGLENBQUE7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sSUFBQSxvQkFBVSxFQUNmLEtBQUssRUFDTCxrQ0FBa0MsQ0FDbkMsQ0FBQTtRQUNILENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCw0QkFBNEI7QUFDNUIsK0JBQStCO0FBQy9CLG9DQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsaUJBQWlCO0FBQ2pCLDJCQUEyQjtBQUMzQixzQ0FBc0M7QUFDdEMsTUFBTTtBQUNOLDRCQUE0QjtBQUM1QixJQUFJIn0=