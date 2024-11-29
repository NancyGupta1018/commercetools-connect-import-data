"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerGroups = exports.deleteAllCustomers = exports.importCustomerGroups = exports.importCustomers = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
// const nconf = require('nconf')
const importCustomers = () => Promise.all(require(process.cwd() + '/src/data/customers.json').map((customer) => (0, helpers_1.execute)({
    uri: services_1.customersService.build(),
    method: 'POST',
    body: customer
})))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Customers imported'))
    .catch((error) => (0, helpers_1.logAndExit)(error, 'Failed to add customers'));
exports.importCustomers = importCustomers;
const importCustomerGroups = () => Promise.all(require(process.cwd() +
    '/data/customer-groups.json').map((customerGroup) => (0, helpers_1.execute)({
    uri: services_1.customerGroupService.build(),
    method: 'POST',
    body: customerGroup
})))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Customer groups imported'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import customer groups'));
exports.importCustomerGroups = importCustomerGroups;
exports.deleteAllCustomers = (0, helpers_1.createStandardDelete)({
    itemName: 'customers',
    service: services_1.customersService
});
exports.deleteCustomerGroups = (0, helpers_1.createStandardDelete)({
    itemName: 'customer groups',
    service: services_1.customerGroupService
});
// if (nconf.get('clean')) {
//   deleteAllCustomers().then(deleteCustomerGroups)
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log('\x1b[32m%s\x1b[0m', 'Importing customers...')
//   importCustomerGroups().then(() => importCustomers())
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvY3VzdG9tZXJzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBRzZCO0FBQzdCLHdDQUltQjtBQUNuQixpQ0FBaUM7QUFFMUIsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLENBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRywwQkFBMEIsQ0FBQyxDQUFDLEdBQUcsQ0FDckQsQ0FBQyxRQUFhLEVBQUUsRUFBRSxDQUNoQixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsMkJBQWdCLENBQUMsS0FBSyxFQUFFO0lBQzdCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDLENBQ0wsQ0FDRjtLQUNFLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDVCxzQ0FBc0M7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUN2RDtLQUNBLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ2YsSUFBQSxvQkFBVSxFQUFDLEtBQUssRUFBRSx5QkFBeUIsQ0FBQyxDQUM3QyxDQUFBO0FBakJRLFFBQUEsZUFBZSxtQkFpQnZCO0FBRUUsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUUsQ0FDdkMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtJQUNuQiw0QkFBNEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWtCLEVBQUUsRUFBRSxDQUN6RCxJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsK0JBQW9CLENBQUMsS0FBSyxFQUFFO0lBQ2pDLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLGFBQWE7Q0FDcEIsQ0FBQyxDQUNILENBQ0Y7S0FDRSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1Qsc0NBQXNDO0FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEVBQ25CLDBCQUEwQixDQUMzQixDQUNGO0tBQ0EsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDYixJQUFBLG9CQUFVLEVBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQ3BELENBQUE7QUFwQlEsUUFBQSxvQkFBb0Isd0JBb0I1QjtBQUVRLFFBQUEsa0JBQWtCLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUNyRCxRQUFRLEVBQUUsV0FBVztJQUNyQixPQUFPLEVBQUUsMkJBQWdCO0NBQzFCLENBQUMsQ0FBQTtBQUVXLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUN2RCxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLE9BQU8sRUFBRSwrQkFBb0I7Q0FDOUIsQ0FBQyxDQUFBO0FBRUYsNEJBQTRCO0FBQzVCLG9EQUFvRDtBQUNwRCxvQ0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLCtEQUErRDtBQUMvRCx5REFBeUQ7QUFDekQsSUFBSSJ9