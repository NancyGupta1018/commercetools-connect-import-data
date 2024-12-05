"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTypes = exports.importTypes = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
const importTypes = () => Promise.all([
    require(process.cwd() + '/src/data/channel-types.json'),
    require(process.cwd() + '/src/data/customer-types.json'),
    require(process.cwd() + '/src/data/order-types.json')
].map((type) => Promise.all(type.map((element) => (0, helpers_1.execute)({
    uri: services_1.typesService.build(),
    method: 'POST',
    body: element
})))))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Types imported'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import channel types'));
exports.importTypes = importTypes;
exports.deleteTypes = (0, helpers_1.createStandardDelete)({
    itemName: 'types',
    service: services_1.typesService
});
if (nconf.get('clean')) {
    (0, exports.deleteTypes)();
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing types...');
    (0, exports.importTypes)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90eXBlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRDtBQUNuRCx3Q0FJbUI7QUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXZCLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUM5QixPQUFPLENBQUMsR0FBRyxDQUNUO0lBQ0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyw4QkFBOEIsQ0FBQztJQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLCtCQUErQixDQUFDO0lBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsNEJBQTRCLENBQUM7Q0FDdEQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNiLE9BQU8sQ0FBQyxHQUFHLENBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFLENBQ3hCLElBQUEsaUJBQU8sRUFBQztJQUNOLEdBQUcsRUFBRSx1QkFBWSxDQUFDLEtBQUssRUFBRTtJQUN6QixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxPQUFPO0NBQ2QsQ0FBQyxDQUNILENBQ0YsQ0FDRixDQUNGO0tBQ0UsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNULHNDQUFzQztBQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLENBQ25EO0tBQ0EsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDYixJQUFBLG9CQUFVLEVBQUMsR0FBRyxFQUFFLGdDQUFnQyxDQUFDLENBQ2xELENBQUE7QUF4QlEsUUFBQSxXQUFXLGVBd0JuQjtBQUVRLFFBQUEsV0FBVyxHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDOUMsUUFBUSxFQUFFLE9BQU87SUFDakIsT0FBTyxFQUFFLHVCQUFZO0NBQ3RCLENBQUMsQ0FBQTtBQUVGLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLElBQUEsbUJBQVcsR0FBRSxDQUFBO0FBQ2YsQ0FBQztLQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQy9CLHNDQUFzQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDdEQsSUFBQSxtQkFBVyxHQUFFLENBQUE7QUFDZixDQUFDIn0=