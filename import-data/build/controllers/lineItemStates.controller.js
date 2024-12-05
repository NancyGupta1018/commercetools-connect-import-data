"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLineItemStates = exports.deleteAllLineItemStates = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
// const nconf = require('nconf')
const deleteAllLineItemStates = () => (0, helpers_1.createStandardDelete)({
    itemName: 'transition states',
    service: () => services_1.stateService.where('transitions is not empty and type = "LineItemState"'),
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
    service: () => services_1.stateService.where('builtIn = false and type = "LineItemState"')
}));
exports.deleteAllLineItemStates = deleteAllLineItemStates;
const createStateDraft = (key, nameEN, nameDE) => ({
    key: key,
    type: 'LineItemState',
    initial: false,
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
const createState = ([key, nameEN, nameDE]) => (0, helpers_1.execute)({
    uri: services_1.stateService.build(),
    method: 'POST',
    body: createStateDraft(key, nameEN, nameDE)
}).then(({ body: { id } }) => id);
const importLineItemStates = () => (0, helpers_1.execute)({
    uri: services_1.stateService.where('builtIn = true').build(),
    method: 'GET'
})
    .then((response) => { var _a, _b; return (_b = (_a = response.body) === null || _a === void 0 ? void 0 : _a.results[0]) === null || _b === void 0 ? void 0 : _b.id; })
    .then((initialId) => Promise.all([
    ['readyToShip', 'Ready to Ship', 'Versandfertig'],
    [
        'backorder',
        'In replenishment',
        'Wird nachbestellt'
    ],
    ['shipped', 'Shipped', 'Versandt'],
    ['canceled', 'Canceled', 'Storniert'],
    ['picking', 'Picking', 'Picking'],
    ['returned', 'Returned', 'Retourniert'],
    [
        'returnApproved',
        'Return approved',
        'Retoure akzeptiert'
    ],
    [
        'returnNotApproved',
        'Return not approved',
        'Retoure nicht akzeptiert'
    ],
    ['closed', 'Closed', 'Abgeschlossen'],
    ['lost', 'Lost', 'Verloren gegangen'],
    [
        'lossApproved',
        'Loss Approved',
        'Verlust bestätigt'
    ],
    [
        'lossNotApproved',
        'Loss not Approved',
        'Wieder gefunden'
    ]
]
    .map(createState)
    .concat(initialId)))
    .then(([readyToShipId, backOrderId, shippedId, cancelledId, pickingId, returnedId, returnApprovedId, returnNotApprovedId, closedId, lostId, lossApprovedId, lossNotApprovedId, initialId]) => Promise.all([
    createTransactions(initialId, [
        pickingId,
        backOrderId
    ]),
    createTransactions(pickingId, [
        readyToShipId,
        backOrderId
    ]),
    createTransactions(backOrderId, [
        pickingId,
        cancelledId
    ]),
    createTransactions(readyToShipId, [shippedId]),
    createTransactions(shippedId, [
        returnedId,
        lostId,
        closedId
    ]),
    createTransactions(returnedId, [
        returnApprovedId,
        returnNotApprovedId
    ]),
    createTransactions(returnApprovedId, [closedId]),
    createTransactions(lostId, [
        lossNotApprovedId,
        lossApprovedId
    ]),
    createTransactions(lossApprovedId, [closedId]),
    createTransactions(lossNotApprovedId, [closedId])
]))
    .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import states'));
exports.importLineItemStates = importLineItemStates;
// if (nconf.get('clean')) {
//   deleteAllLineItemStates()
// } else if (nconf.get('import')) {
//   // eslint-disable-next-line no-console
//   console.log(
//     '\x1b[32m%s\x1b[0m',
//     'Importing line item states...'
//   )
//   importLineItemStates()
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZUl0ZW1TdGF0ZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9saW5lSXRlbVN0YXRlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRDtBQUNuRCx3Q0FJbUI7QUFDbkIsaUNBQWlDO0FBRTFCLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFLENBQzFDLElBQUEsOEJBQW9CLEVBQUM7SUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osdUJBQVksQ0FBQyxLQUFLLENBQ2hCLHFEQUFxRCxDQUN0RDtJQUNILGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ3pCLElBQUEsaUJBQU8sRUFBQztRQUNOLEdBQUcsRUFBRSx1QkFBWTthQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ2YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDM0IsS0FBSyxFQUFFO1FBQ1YsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsT0FBTyxFQUFFO2dCQUNQO29CQUNFLE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLFdBQVcsRUFBRSxFQUFFO2lCQUNoQjthQUNGO1NBQ0Y7S0FDRixDQUFDO0NBQ0wsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUNQLElBQUEsOEJBQW9CLEVBQUM7SUFDbkIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLHVCQUFZLENBQUMsS0FBSyxDQUNoQiw0Q0FBNEMsQ0FDN0M7Q0FDSixDQUFDLENBQ0gsQ0FBQTtBQWhDVSxRQUFBLHVCQUF1QiwyQkFnQ2pDO0FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQVEsRUFBRSxNQUFXLEVBQUUsTUFBVyxFQUFF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