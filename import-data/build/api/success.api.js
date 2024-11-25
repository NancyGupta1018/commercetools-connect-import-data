"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSuccess = void 0;
/**
 * Send a success response to the client
 *
 * @param {Response} response Express response
 * @param {number} statusCode The status code of the operation
 * @param {Array<UpdateAction>} updateActions The update actions that were made in the process
 * @returns Success response with 200 status code and the update actions array
 */
const apiSuccess = (statusCode, updateActions, response) => {
    const responseBody = {};
    if (updateActions) {
        responseBody.actions = updateActions;
    }
    response.status(statusCode).json(Object.assign({}, responseBody));
};
exports.apiSuccess = apiSuccess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VjY2Vzcy5hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL3N1Y2Nlc3MuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBOzs7Ozs7O0dBT0c7QUFDSSxNQUFNLFVBQVUsR0FBRyxDQUN4QixVQUFrQixFQUNsQixhQUFrQyxFQUNsQyxRQUFrQixFQUNsQixFQUFFO0lBQ0YsTUFBTSxZQUFZLEdBQUcsRUFBOEIsQ0FBQztJQUVwRCxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksbUJBQzNCLFlBQVksRUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBZFcsUUFBQSxVQUFVLGNBY3JCIn0=