"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLineItemStates = exports.deleteAllLineItemStates = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
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
            action: 'transaction-state-1',
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
const createState = (key, nameEN, nameDE) => (0, helpers_1.execute)({
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
    ["readyToShip", "Ready to Ship", "Versandfertig"],
    [
        "backorder",
        "In replenishment",
        "Wird nachbestellt"
    ],
    ["shipped", "Shipped", "Versandt"],
    ["canceled", "Canceled", "Storniert"],
    ["picking", "Picking", "Picking"],
    ["returned", "Returned", "Retourniert"],
    [
        "returnApproved",
        "Return approved",
        "Retoure akzeptiert"
    ],
    [
        "returnNotApproved",
        "Return not approved",
        "Retoure nicht akzeptiert"
    ],
    ["closed", "Closed", "Abgeschlossen"],
    ["lost", "Lost", "Verloren gegangen"],
    [
        "lossApproved",
        "Loss Approved",
        "Verlust bestätigt"
    ],
    [
        "lossNotApproved",
        "Loss not Approved",
        "Wieder gefunden"
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
if (nconf.get('clean')) {
    (0, exports.deleteAllLineItemStates)();
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing line item states...');
    (0, exports.importLineItemStates)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZUl0ZW1TdGF0ZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9saW5lSXRlbVN0YXRlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRDtBQUNuRCx3Q0FJbUI7QUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXZCLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFLENBQzFDLElBQUEsOEJBQW9CLEVBQUM7SUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtJQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQ1osdUJBQVksQ0FBQyxLQUFLLENBQ2hCLHFEQUFxRCxDQUN0RDtJQUNILGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ3pCLElBQUEsaUJBQU8sRUFBQztRQUNOLEdBQUcsRUFBRSx1QkFBWTthQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ2YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDM0IsS0FBSyxFQUFFO1FBQ1YsTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsT0FBTyxFQUFFO2dCQUNQO29CQUNFLE1BQU0sRUFBRSxnQkFBZ0I7b0JBQ3hCLFdBQVcsRUFBRSxFQUFFO2lCQUNoQjthQUNGO1NBQ0Y7S0FDRixDQUFDO0NBQ0wsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUNQLElBQUEsOEJBQW9CLEVBQUM7SUFDbkIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUNaLHVCQUFZLENBQUMsS0FBSyxDQUNoQiw0Q0FBNEMsQ0FDN0M7Q0FDSixDQUFDLENBQ0gsQ0FBQTtBQWhDVSxRQUFBLHVCQUF1QiwyQkFnQ2pDO0FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQVEsRUFBRSxNQUFXLEVBQUUsTUFBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLEdBQUcsRUFBRSxHQUFHO0lBQ1IsSUFBSSxFQUFFLGVBQWU7SUFDckIsT0FBTyxFQUFFLEtBQUs7SUFDZCxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7Q0FDakMsQ0FBQyxDQUFBO0FBRUYsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO0lBQy9DLE1BQU0sY0FBYyxHQUFrQyxFQUFFLENBQUE7SUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1FBQzFCLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTztRQUNMO1lBQ0UsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixXQUFXLEVBQUUsY0FBYztTQUM1QjtLQUNGLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLGtCQUFrQixHQUFHLENBQUMsTUFBVyxFQUFFLEtBQVksRUFBRSxFQUFFLENBQ3ZELElBQUEsaUJBQU8sRUFBQztJQUNOLEdBQUcsRUFBRSx1QkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUU7SUFDdEMsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDZCxJQUFBLGlCQUFPLEVBQUM7UUFDTixHQUFHLEVBQUUsdUJBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQ3RDLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUN6QixPQUFPLEVBQUUsdUJBQXVCLENBQUMsS0FBSyxDQUFDO1NBQ3hDO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFSixtQkFBbUI7QUFDbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFRLEVBQUUsTUFBVyxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQ3pELElBQUEsaUJBQU8sRUFBQztJQUNOLEdBQUcsRUFBRSx1QkFBWSxDQUFDLEtBQUssRUFBRTtJQUN6QixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztDQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUU1QixNQUFNLG9CQUFvQixHQUFHLEdBQUcsRUFBRSxDQUN2QyxJQUFBLGlCQUFPLEVBQUM7SUFDTixHQUFHLEVBQUUsdUJBQVksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUU7SUFDakQsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDO0tBQ0MsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsZUFBQyxPQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsSUFBSSwwQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLDBDQUFFLEVBQUUsQ0FBQSxFQUFBLENBQUM7S0FDakQsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDbEIsT0FBTyxDQUFDLEdBQUcsQ0FDVDtJQUNFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7SUFDakQ7UUFDRSxXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLG1CQUFtQjtLQUNwQjtJQUNELENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7SUFDbEMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztJQUNyQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0lBQ2pDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7SUFDdkM7UUFDRSxnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtLQUNyQjtJQUNEO1FBQ0UsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQiwwQkFBMEI7S0FDM0I7SUFDRCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDO0lBQ3JDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQztJQUNyQztRQUNFLGNBQWM7UUFDZCxlQUFlO1FBQ2YsbUJBQW1CO0tBQ3BCO0lBQ0Q7UUFDRSxpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGlCQUFpQjtLQUNsQjtDQUNGO0tBQ0UsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQ3JCLENBQ0Y7S0FDQSxJQUFJLENBQ0gsQ0FBQyxDQUNDLGFBQWEsRUFDYixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsUUFBUSxFQUNSLE1BQU0sRUFDTixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLFNBQVMsQ0FDVixFQUFFLEVBQUUsQ0FDSCxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ1Ysa0JBQWtCLENBQUMsU0FBUyxFQUFFO1FBQzVCLFNBQVM7UUFDVCxXQUFXO0tBQ1osQ0FBQztJQUNGLGtCQUFrQixDQUFDLFNBQVMsRUFBRTtRQUM1QixhQUFhO1FBQ2IsV0FBVztLQUNaLENBQUM7SUFDRixrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7UUFDOUIsU0FBUztRQUNULFdBQVc7S0FDWixDQUFDO0lBQ0Ysa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFO1FBQzVCLFVBQVU7UUFDVixNQUFNO1FBQ04sUUFBUTtLQUNULENBQUM7SUFDRixrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7UUFDN0IsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtLQUNwQixDQUFDO0lBQ0Ysa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7UUFDekIsaUJBQWlCO1FBQ2pCLGNBQWM7S0FDZixDQUFDO0lBQ0Ysa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNsRCxDQUFDLENBQ0w7S0FDQSxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNiLElBQUEsb0JBQVUsRUFBQyxHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FDM0MsQ0FBQTtBQWhHUSxRQUFBLG9CQUFvQix3QkFnRzVCO0FBRUwsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDdkIsSUFBQSwrQkFBdUIsR0FBRSxDQUFBO0FBQzNCLENBQUM7S0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUMvQixzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBbUIsRUFDbkIsK0JBQStCLENBQ2hDLENBQUE7SUFDRCxJQUFBLDRCQUFvQixHQUFFLENBQUE7QUFDeEIsQ0FBQyJ9