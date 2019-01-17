// import Sequelize ORM
const Sequelize = require('sequelize');
const db = {};

// config connection
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};

// connect to db
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool,
    logging: false
});


// add Sequelize and sequelize connection instance to db
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// export db
console.log('done connecting to database ... ', '00001');
module.exports = db;