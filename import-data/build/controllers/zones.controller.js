"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllZones = exports.importZones = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
// const nconf = require('nconf')
const importZones = () => Promise.all(require(process.cwd() + '/src/data/zones.json').map((element) => (0, helpers_1.execute)({
    uri: services_1.zonesService.build(),
    method: 'POST',
    body: element
})))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Zones imported'))
    .catch((error) => (0, helpers_1.logAndExit)(error, 'Failed to import zones'));
exports.importZones = importZones;
exports.deleteAllZones = (0, helpers_1.createStandardDelete)({
    itemName: 'zones',
    service: services_1.zonesService
});
// if (nconf.get('clean')) {
//   deleteAllZones()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing zones...')
//   importZones()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy96b25lcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRDtBQUNuRCx3Q0FJbUI7QUFDbkIsaUNBQWlDO0FBRTFCLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUM5QixPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxHQUFHLENBQ2pELENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FDZixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsdUJBQVksQ0FBQyxLQUFLLEVBQUU7SUFDekIsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUMsQ0FDTCxDQUNGO0tBQ0UsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNULHNDQUFzQztBQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQ25EO0tBQ0EsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDZixJQUFBLG9CQUFVLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixDQUFDLENBQzVDLENBQUE7QUFqQlEsUUFBQSxXQUFXLGVBaUJuQjtBQUVRLFFBQUEsY0FBYyxHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDakQsUUFBUSxFQUFFLE9BQU87SUFDakIsT0FBTyxFQUFFLHVCQUFZO0NBQ3RCLENBQUMsQ0FBQTtBQUVGLDRCQUE0QjtBQUM1QixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywyREFBMkQ7QUFDM0Qsa0JBQWtCO0FBQ2xCLElBQUkifQ==