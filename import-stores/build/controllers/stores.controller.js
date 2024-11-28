"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStores = exports.importStores = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
const importStores = () => Promise.all([require(process.cwd() + '/src/data/stores.json')].map((type) => Promise.all(type.map((element) => (0, helpers_1.execute)({
    uri: services_1.storeService.build(),
    method: 'POST',
    body: element
})))))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Types imported'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import channel types'));
exports.importStores = importStores;
exports.deleteStores = (0, helpers_1.createStandardDelete)({
    itemName: 'stores',
    service: services_1.storeService
});
if (nconf.get('clean')) {
    (0, exports.deleteStores)();
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing types...');
    (0, exports.importStores)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvc3RvcmVzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW1EO0FBQ25ELHdDQUltQjtBQUNuQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdkIsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQ1QsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQ3BELENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDUCxPQUFPLENBQUMsR0FBRyxDQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUN4QixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsdUJBQVksQ0FBQyxLQUFLLEVBQUU7SUFDekIsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUMsQ0FDSCxDQUNGLENBQ0osQ0FDRjtLQUNFLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDVCxzQ0FBc0M7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUNuRDtLQUNBLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2IsSUFBQSxvQkFBVSxFQUFDLEdBQUcsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUNsRCxDQUFBO0FBckJRLFFBQUEsWUFBWSxnQkFxQnBCO0FBRVEsUUFBQSxZQUFZLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUMvQyxRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsdUJBQVk7Q0FDdEIsQ0FBQyxDQUFBO0FBRUYsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDdkIsSUFBQSxvQkFBWSxHQUFFLENBQUE7QUFDaEIsQ0FBQztLQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQy9CLHNDQUFzQztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFDdEQsSUFBQSxvQkFBWSxHQUFFLENBQUE7QUFDaEIsQ0FBQyJ9