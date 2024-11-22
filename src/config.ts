// import * as nconf from 'nconf';
import * as dotenv from 'dotenv';
import { URL } from 'url';

// Define the structure of the configuration object
interface Config {
  projectKey: string | undefined;
  clientId: string | undefined;
  clientSecret: string | undefined;
  authUrl: string | undefined;
  apiUrl: string | undefined;
}

class Configuration {
  config: Config;

  constructor() {
    this.config = {} as Config; // Type assertion to initialize an empty config
    this.init();
  }

  // Initialize the configuration
  init(): void {
    this.load();
    this.print();
  }

  // Normalize the URL to get only the protocol, host, and port
  normalizeUrl(urlString: string): string {
    // Ensure the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = 'https://' + urlString;
    }

    // Parse and return only the origin (protocol, host, and port)
    return new URL(urlString).origin;
  }

  // Load configuration from environment variables
  load(): void {
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
  print(): void {
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
  data(): Config {
    return this.config;
  }
}

// Create an instance of Configuration and export the data
export const config = new Configuration().data();
