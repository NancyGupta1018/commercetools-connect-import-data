"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importChannels = exports.deleteChannels = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
exports.deleteChannels = (0, helpers_1.createStandardDelete)({
    itemName: 'channels',
    service: services_1.channelsService
});
const importChannels = () => Promise.all(require(process.cwd() + '/src/data/channels.json').map((element) => (0, helpers_1.execute)({
    uri: services_1.channelsService.build(),
    method: 'POST',
    body: element
}))).then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Channels imported'), (err) => (0, helpers_1.logAndExit)(err, 'Failed to import channels'));
exports.importChannels = importChannels;
// if (nconf.get('clean')) {
//   deleteChannels()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing channels...')
//   importChannels()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jaGFubmVscy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFzRDtBQUN0RCx3Q0FJbUI7QUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWpCLFFBQUEsY0FBYyxHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDakQsUUFBUSxFQUFFLFVBQVU7SUFDcEIsT0FBTyxFQUFFLDBCQUFlO0NBQ3pCLENBQUMsQ0FBQTtBQUVLLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcseUJBQXlCLENBQUMsQ0FBQyxHQUFHLENBQ3BELENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FDZixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsMEJBQWUsQ0FBQyxLQUFLLEVBQUU7SUFDNUIsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUMsQ0FDTCxDQUNGLENBQUMsSUFBSSxDQUNKLEdBQUcsRUFBRTtBQUNILHNDQUFzQztBQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLEVBQ3ZELENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFBLG9CQUFVLEVBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLENBQ3RELENBQUE7QUFmVSxRQUFBLGNBQWMsa0JBZXhCO0FBRUgsNEJBQTRCO0FBQzVCLHFCQUFxQjtBQUNyQixvQ0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLDhEQUE4RDtBQUM5RCxxQkFBcUI7QUFDckIsSUFBSSJ9