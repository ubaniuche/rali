const dotenv = require("dotenv");
const appPath = require("app-root-path");
dotenv.config({ path: `${appPath}/.env` });

module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DEV_HOST,
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        dialectOptions: {
            idle_in_transaction_session_timeout: 60000
        }
    },
    test: {
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.TEST_HOST,
        dialect: "postgres",
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        dialectOptions: {
            idle_in_transaction_session_timeout: 60000
        }
    },
};