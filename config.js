/*
* Configuration file for Api
 */

var environmets = {}

//Staging {default} environment
environmets.staging = {
    'port' : 3000,
    'envName': 'staging'
}

//Production environment
environmets.production = {
    'port' : 3001,
    'envName': 'production'
}

// Determinate wich process is called from console
var processName = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

//check if Process Name exists in our environment
var moduleToExport = typeof (environmets[processName]) == 'object' ? environmets[processName] : environmets.staging;

// export the apropriate environment
module.exports = moduleToExport;


