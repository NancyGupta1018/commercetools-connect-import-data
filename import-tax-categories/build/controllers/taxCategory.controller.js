"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importTaxCategories = exports.deleteTaxCategories = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
exports.deleteTaxCategories = (0, helpers_1.createStandardDelete)({
    itemName: 'tax categories',
    service: services_1.taxService
});
const importTaxCategories = () => Promise.all(require(process.cwd() + '/src/data/tax-category.json').map((element) => (0, helpers_1.execute)({
    uri: services_1.taxService.build(),
    method: 'POST',
    body: element
})))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Tax categories imported'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import tax categories'));
exports.importTaxCategories = importTaxCategories;
if (nconf.get('clean')) {
    (0, exports.deleteTaxCategories)();
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing tax categories...');
    (0, exports.importTaxCategories)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4Q2F0ZWdvcnkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YXhDYXRlZ29yeS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFpRDtBQUNqRCx3Q0FJbUI7QUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWpCLFFBQUEsbUJBQW1CLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUN0RCxRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLE9BQU8sRUFBRSxxQkFBVTtDQUNwQixDQUFDLENBQUE7QUFFSyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRSxDQUN0QyxPQUFPLENBQUMsR0FBRyxDQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxHQUFHLENBQ3hELENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FDZixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUscUJBQVUsQ0FBQyxLQUFLLEVBQUU7SUFDdkIsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUMsQ0FDTCxDQUNGO0tBQ0UsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNULHNDQUFzQztBQUN0QyxPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDMUIsQ0FDRjtLQUNBLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2IsSUFBQSxvQkFBVSxFQUFDLEdBQUcsRUFBRSxpQ0FBaUMsQ0FBQyxDQUNuRCxDQUFBO0FBcEJRLFFBQUEsbUJBQW1CLHVCQW9CM0I7QUFFTCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUN2QixJQUFBLDJCQUFtQixHQUFFLENBQUE7QUFDdkIsQ0FBQztLQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQy9CLHNDQUFzQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFtQixFQUNuQiw2QkFBNkIsQ0FDOUIsQ0FBQTtJQUNELElBQUEsMkJBQW1CLEdBQUUsQ0FBQTtBQUN2QixDQUFDIn0=