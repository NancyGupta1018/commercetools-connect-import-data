"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCarts = void 0;
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const nconf = require('nconf');
exports.deleteAllCarts = (0, helpers_1.createStandardDelete)({
    itemName: 'carts',
    service: services_1.cartsService
});
if (nconf.get('clean')) {
    (0, exports.deleteAllCarts)();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jYXJ0cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFtRDtBQUNuRCx3Q0FBaUQ7QUFDakQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWpCLFFBQUEsY0FBYyxHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDakQsUUFBUSxFQUFFLE9BQU87SUFDakIsT0FBTyxFQUFFLHVCQUFZO0NBQ3RCLENBQUMsQ0FBQTtBQUVGLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLElBQUEsc0JBQWMsR0FBRSxDQUFBO0FBQ2xCLENBQUMifQ==