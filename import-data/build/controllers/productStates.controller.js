"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProductStates = exports.deleteAllProductStates = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
const deleteAllProductStates = () => (0, helpers_1.createStandardDelete)({
    itemName: 'transition states',
    service: () => services_1.stateService.where('transitions is not empty and type = "ProductState"'),
    deleteFunction: (result) => (0, helpers_1.execute)({
        uri: services_1.stateService
            .byId(result.id)
            .withVersion(result.version)
            .build(),
        method: 'POST',
        body: {
            version: result.version,
            actions: [
                {
                    action: 'setTransitions',
                    transitions: []
                }
            ]
        }
    })
})().then((0, helpers_1.createStandardDelete)({
    itemName: 'states',
    service: () => services_1.stateService.where('type = "ProductState"')
}));
exports.deleteAllProductStates = deleteAllProductStates;
const createStateDraft = (key, nameEN, nameDE, intialState) => ({
    key: key,
    type: 'ProductState',
    initial: intialState,
    name: { en: nameEN, de: nameDE }
});
const createTransactionsDraft = (toIds) => {
    const transactionObj = [];
    toIds.forEach((item) => {
        transactionObj.push({ typeId: 'state', id: item });
    });
    return [
        {
            action: 'setTransitions',
            transitions: transactionObj
        }
    ];
};
const createTransactions = (fromId, toIds) => (0, helpers_1.execute)({
    uri: services_1.stateService.byId(fromId).build(),
    method: 'GET'
}).then((res) => {
    (0, helpers_1.execute)({
        uri: services_1.stateService.byId(fromId).build(),
        method: 'POST',
        body: {
            version: res.body.version,
            actions: createTransactionsDraft(toIds)
        }
    });
});
// return a promise
const createState = (key, nameEN, nameDE, intialState) => (0, helpers_1.execute)({
    uri: services_1.stateService.build(),
    method: 'POST',
    body: createStateDraft(key, nameEN, nameDE, intialState)
}).then(({ body: { id } }) => id);
const importProductStates = () => (0, helpers_1.execute)({
    uri: services_1.stateService.build(),
    method: 'POST',
    body: createStateDraft('productStateInitial', 'Open', 'Open', true)
})
    .then((response) => { var _a; return (_a = response.body) === null || _a === void 0 ? void 0 : _a.id; }) // Extract initialId from the response
    .then((initialId) => 
// Create state for 'readyForReview' and 'approved', and append initialId.
Promise.all([
    ['readyForReview', 'Ready for Review', 'Ready for Review', false],
    ['approved', 'Approved', 'Approved', false]
]
    .map(([key, nameEN, nameDE, initialState]) => createState(key, nameEN, nameDE, initialState)) // Spread each state array as arguments for createState
    .concat(Promise.resolve(initialId)) // Make sure to wrap initialId in a Promise to align with async behavior
))
    .then(([readyForReviewId, approvedId, initialId]) => 
// Perform transactions based on the state IDs
Promise.all([
    createTransactions(initialId, [readyForReviewId]),
    createTransactions(readyForReviewId, [initialId, approvedId])
]))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import product states'));
exports.importProductStates = importProductStates;
// if (nconf.get('clean')) {
//   deleteAllProductStates()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log(
//     '\x1b[32m%s\x1b[0m',
//     'Importing line item states...'
//   )
//   importProductStates()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdFN0YXRlcy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3Byb2R1Y3RTdGF0ZXMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBbUQ7QUFDbkQsd0NBSW1CO0FBQ25CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUV2QixNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRSxDQUN6QyxJQUFBLDhCQUFvQixFQUFDO0lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLHVCQUFZLENBQUMsS0FBSyxDQUNoQixvREFBb0QsQ0FDckQ7SUFDSCxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUN6QixJQUFBLGlCQUFPLEVBQUM7UUFDTixHQUFHLEVBQUUsdUJBQVk7YUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNmLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzNCLEtBQUssRUFBRTtRQUNWLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxNQUFNLEVBQUUsZ0JBQWdCO29CQUN4QixXQUFXLEVBQUUsRUFBRTtpQkFDaEI7YUFDRjtTQUNGO0tBQ0YsQ0FBQztDQUNMLENBQUMsRUFBRSxDQUFDLElBQUksQ0FDUCxJQUFBLDhCQUFvQixFQUFDO0lBQ25CLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDWix1QkFBWSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztDQUM5QyxDQUFDLENBQ0gsQ0FBQTtBQTlCVSxRQUFBLHNCQUFzQiwwQkE4QmhDO0FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxDQUN2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