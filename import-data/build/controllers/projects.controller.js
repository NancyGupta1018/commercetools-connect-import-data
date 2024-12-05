"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProjectData = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
const projectData = require(process.cwd() +
    '/src/data/project.json');
const importProjectData = () => (0, helpers_1.execute)({
    uri: services_1.projectService.build(),
    method: 'GET'
})
    .then((result) => (0, helpers_1.execute)({
    uri: services_1.projectService.build(),
    method: 'POST',
    body: {
        version: result.body.version,
        actions: [
            {
                action: 'changeCurrencies',
                currencies: projectData.currencies
            }
        ]
    }
}))
    .then((result) => (0, helpers_1.execute)({
    uri: services_1.projectService.build(),
    method: 'POST',
    body: {
        version: result.body.version,
        actions: [
            {
                action: 'changeCountries',
                countries: projectData.countries
            }
        ]
    }
}))
    .then((result) => (0, helpers_1.execute)({
    uri: services_1.projectService.build(),
    method: 'POST',
    body: {
        version: result.body.version,
        actions: [
            {
                action: 'changeLanguages',
                languages: projectData.languages
            }
        ]
    }
}))
    .then((result) => (0, helpers_1.execute)({
    uri: services_1.projectService.build(),
    method: 'POST',
    body: {
        version: result.body.version,
        actions: [
            {
                action: 'changeProductSearchIndexingEnabled',
                enabled: true
            }
        ]
    }
}))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Project set up'))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to set up project'));
exports.importProjectData = importProjectData;
if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing project data...');
    (0, exports.importProjectData)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9qZWN0cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFxRDtBQUNyRCx3Q0FBZ0Q7QUFDaEQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzlCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0lBQ3ZDLHdCQUF3QixDQUFDLENBQUE7QUFFcEIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLEVBQUUsQ0FDcEMsSUFBQSxpQkFBTyxFQUFDO0lBQ04sR0FBRyxFQUFFLHlCQUFjLENBQUMsS0FBSyxFQUFFO0lBQzNCLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQztLQUNDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ2YsSUFBQSxpQkFBTyxFQUFDO0lBQ04sR0FBRyxFQUFFLHlCQUFjLENBQUMsS0FBSyxFQUFFO0lBQzNCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTztRQUM1QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVU7YUFDbkM7U0FDRjtLQUNGO0NBQ0YsQ0FBQyxDQUNIO0tBQ0EsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDZixJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUseUJBQWMsQ0FBQyxLQUFLLEVBQUU7SUFDM0IsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQzVCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLE1BQU0sRUFBRSxpQkFBaUI7Z0JBQ3pCLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUzthQUNqQztTQUNGO0tBQ0Y7Q0FDRixDQUFDLENBQ0g7S0FDQSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNmLElBQUEsaUJBQU8sRUFBQztJQUNOLEdBQUcsRUFBRSx5QkFBYyxDQUFDLEtBQUssRUFBRTtJQUMzQixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU87UUFDNUIsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsTUFBTSxFQUFFLGlCQUFpQjtnQkFDekIsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO2FBQ2pDO1NBQ0Y7S0FDRjtDQUNGLENBQUMsQ0FDSDtLQUNBLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ2YsSUFBQSxpQkFBTyxFQUFDO0lBQ04sR0FBRyxFQUFFLHlCQUFjLENBQUMsS0FBSyxFQUFFO0lBQzNCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTztRQUM1QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxNQUFNLEVBQUUsb0NBQW9DO2dCQUM1QyxPQUFPLEVBQUUsSUFBSTthQUNkO1NBQ0Y7S0FDRjtDQUNGLENBQUMsQ0FDSDtLQUNBLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDVCxzQ0FBc0M7QUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUNuRDtLQUNBLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2IsSUFBQSxvQkFBVSxFQUFDLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQyxDQUM1QyxDQUFBO0FBdkVRLFFBQUEsaUJBQWlCLHFCQXVFekI7QUFFTCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUN4QixzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBbUIsRUFDbkIsMkJBQTJCLENBQzVCLENBQUE7SUFDRCxJQUFBLHlCQUFpQixHQUFFLENBQUE7QUFDckIsQ0FBQyJ9