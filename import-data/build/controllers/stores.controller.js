"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStores = exports.importStores = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvc3RvcmVzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW1EO0FBQ25ELHdDQUltQjtBQUVaLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUMvQixPQUFPLENBQUMsR0FBRyxDQUNULENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUNwRCxDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDVCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FDeEIsSUFBQSxpQkFBTyxFQUFDO0lBQ04sR0FBRyxFQUFFLHVCQUFZLENBQUMsS0FBSyxFQUFFO0lBQ3pCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLE9BQU87Q0FDZCxDQUFDLENBQ0gsQ0FDRixDQUNKLENBQ0Y7S0FDRSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1Qsc0NBQXNDO0FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FDbkQ7S0FDQSxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNiLElBQUEsb0JBQVUsRUFBQyxHQUFHLEVBQUUsZ0NBQWdDLENBQUMsQ0FDbEQsQ0FBQTtBQXJCUSxRQUFBLFlBQVksZ0JBcUJwQjtBQUVRLFFBQUEsWUFBWSxHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDL0MsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLHVCQUFZO0NBQ3RCLENBQUMsQ0FBQSJ9