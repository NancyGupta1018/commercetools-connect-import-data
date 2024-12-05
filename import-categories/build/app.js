"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Import routes
const categories_route_1 = __importDefault(require("./routes/categories.route"));
const channels_route_1 = __importDefault(require("./routes/channels.route"));
const config_utils_1 = require("./utils/config.utils");
const stores_routes_1 = __importDefault(require("./routes/stores.routes"));
// Read env variables
(0, config_utils_1.readConfiguration)();
// Create the express app
const app = (0, express_1.default)();
app.disable('x-powered-by');
// Define configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Define routes
app.use('/category', categories_route_1.default);
app.use('/channel', channels_route_1.default);
app.use('/stores', stores_routes_1.default);
// app.use('*', () => {
//   throw new CustomError(404, 'Path not found.');
// });
// // Global error handler
// app.use(errorMiddleware);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWlDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixzREFBMkM7QUFDM0MsOERBQXFDO0FBRXJDLGdCQUFnQjtBQUVoQixpRkFBeUQ7QUFDekQsNkVBQW9EO0FBQ3BELHVEQUF5RDtBQUN6RCwyRUFBaUQ7QUFFakQscUJBQXFCO0FBQ3JCLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQztBQUVwQix5QkFBeUI7QUFDekIsTUFBTSxHQUFHLEdBQVksSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDL0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1Qix3QkFBd0I7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbkQsZ0JBQWdCO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLDBCQUFnQixDQUFDLENBQUM7QUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsd0JBQWEsQ0FBQyxDQUFDO0FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLHVCQUFXLENBQUMsQ0FBQztBQUVoQyx1QkFBdUI7QUFDdkIsbURBQW1EO0FBQ25ELE1BQU07QUFDTiwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBRTVCLGtCQUFlLEdBQUcsQ0FBQyJ9