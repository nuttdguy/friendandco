
// IMPORT LIBRARIES
const Sequelize = require('sequelize');


// CONFIG
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};


// CONNECT TO DB
const sequelize = new Sequelize(KEYS.MYSQLURI, { pool: pool });


// DEFINE MODEL
const user_domain = './mysql/domains/user/';
const db = {
    User: sequelize.define('user', require(user_domain  + 'user.entity')),
    Profile: sequelize.define('profile', require(user_domain  + 'profile.entity')),
    Verify: sequelize.define('verify', require(user_domain  + 'verify.entity')),
    Secret: sequelize.define('secret', require(user_domain  + 'secret.entity'))
};


db.sequelize = Sequelize;
console.log('Done loading entities ...');
console.log('Done connecting to database ...');

module.exports = db;