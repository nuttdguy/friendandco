
// import sequelize
const Sequelize = require('sequelize');


// config connection
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};


// connect to db
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool,
    logging: false
});


console.log('done connecting to database ...');
module.exports = sequelize;