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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// import * as nconf from 'nconf';
const dotenv = __importStar(require("dotenv"));
const url_1 = require("url");
class Configuration {
    constructor() {
        this.config = {}; // Type assertion to initialize an empty config
        this.init();
    }
    // Initialize the configuration
    init() {
        this.load();
        this.print();
    }
    // Normalize the URL to get only the protocol, host, and port
    normalizeUrl(urlString) {
        // Ensure the URL starts with http:// or https://
        if (!/^https?:\/\//i.test(urlString)) {
            urlString = 'https://' + urlString;
        }
        // Parse and return only the origin (protocol, host, and port)
        return new url_1.URL(urlString).origin;
    }
    // Load configuration from environment variables
    load() {
        dotenv.config(); // Load environment variables from .env file
        // nconf.use('argv').nconf.argv().env(); // Load from command-line arguments and environment variables
        // Required keys can be checked if needed (uncomment the line below)
        // nconf.required(['projectKey', 'clientId', 'clientSecret', 'authUrl', 'apiUrl']);
        // Assign values to config from environment variables
        this.config = {
            projectKey: process.env.CTP_PROJECT_KEY,
            clientId: process.env.CTP_CLIENT_ID,
            clientSecret: process.env.CTP_CLIENT_SECRET,
            authUrl: this.normalizeUrl(process.env.CTP_AUTH_URL || ''),
            apiUrl: this.normalizeUrl(process.env.CTP_API_URL || '')
        };
    }
    // Print the configuration details
    print() {
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
        // eslint-disable-next-line no-console
        console.log('projectKey: ' + this.config.projectKey);
        // eslint-disable-next-line no-console
        console.log('clientId: ' + this.config.clientId);
        // eslint-disable-next-line no-console
        console.log('clientSecret: ' + this.config.clientSecret);
        // eslint-disable-next-line no-console
        console.log('authUrl: ' + this.config.authUrl);
        // eslint-disable-next-line no-console
        console.log('apiUrl: ' + this.config.apiUrl);
        // eslint-disable-next-line no-console
        console.log('--------------------------------------------------------');
    }
    // Return the configuration object
    data() {
        return this.config;
    }
}
// Create an instance of Configuration and export the data
exports.config = new Configuration().data();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFrQztBQUNsQywrQ0FBaUM7QUFDakMsNkJBQTBCO0FBVzFCLE1BQU0sYUFBYTtJQUdqQjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBWSxDQUFDLENBQUMsK0NBQStDO1FBQzNFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCwrQkFBK0I7SUFDL0IsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsWUFBWSxDQUFDLFNBQWlCO1FBQzVCLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3JDLFNBQVMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3JDLENBQUM7UUFFRCw4REFBOEQ7UUFDOUQsT0FBTyxJQUFJLFNBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVELGdEQUFnRDtJQUNoRCxJQUFJO1FBQ0YsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsNENBQTRDO1FBQzdELHNHQUFzRztRQUV0RyxvRUFBb0U7UUFDcEUsbUZBQW1GO1FBRW5GLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1osVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtZQUN2QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1lBQ25DLFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtZQUMzQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7WUFDMUQsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1NBQ3pELENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQWtDO0lBQ2xDLEtBQUs7UUFDSCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3hFLHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekQsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0Msc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0Msc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsa0NBQWtDO0lBQ2xDLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBRUQsMERBQTBEO0FBQzdDLFFBQUEsTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMifQ==