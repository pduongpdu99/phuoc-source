const { config } = require("dotenv");

const configuration = {
    port: config().parsed['PORT'],
    hostname: config().parsed['HOSTNAME'],
}

module.exports = configuration;