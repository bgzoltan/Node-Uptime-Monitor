/*
 * Create and export config variables
 *
 */

let environments = {};

// Staging (default) object
environments.staging = {
  port: 3300,
  envName: "staging",
};

// Production object
environments.production = {
  port: 5300,
  envName: "production",
};

// Determine which environment was passed as a command line argument
const currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check is the current environment one of the environments
const enviromentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

export default enviromentToExport;
