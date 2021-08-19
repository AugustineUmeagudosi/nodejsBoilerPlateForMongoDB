const env = process.env.NODE_ENV; // 'dev' or 'test' 

const config = {
    production: {
        app: {
            port: parseInt(process.env.PORT) || 5000
        },
        db: {
            host: process.env.PROD_DB_HOST || 'localhost',
            port: parseInt(process.env.PROD_DB_PORT) || 27017,
            name: process.env.PROD_DB_NAME || 'boilerPlate'
        }
    },

    development: {
        app: {
            port: parseInt(process.env.PORT) || 5000
        },
        db: {
            host: process.env.DEV_DB_HOST || 'localhost',
            port: parseInt(process.env.DEV_DB_PORT) || 27017,
            name: process.env.DEV_DB_NAME || 'boilerPlate'
        }
    },

    test: {
        app: {
            port: parseInt(process.env.TEST_APP_PORT) || 3001
        },
        db: {
            host: process.env.TEST_DB_HOST || 'localhost',
            port: parseInt(process.env.TEST_DB_PORT) || 27017,
            name: process.env.TEST_DB_NAME || 'boilerPlateTestDB'
        }
    },
};

module.exports = config[env];
