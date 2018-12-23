
// IMPORT LIBRARIES
const Sequelize = require('sequelize');


// CONFIG
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};


// CONNECT TO DB
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool,
    define: {
        underscored: true
    }
});
console.log('Done connecting to database ...');


// DEFINE ENTITIES
const user_domain = './mysql/domains/user/';
const history_domain = './mysql/domains/history/';
const persona_domain = './mysql/domains/persona/';
const db = {
    User: sequelize.define('user', require(user_domain  + 'user.entity')),
    Profile: sequelize.define('profile', require(user_domain  + 'profile.entity')),
    VerifyEmail: sequelize.define('verifyEmail', require(user_domain  + 'verifyEmail.entity')),
    Secret: sequelize.define('secret', require(user_domain  + 'secret.entity'))
};


// ADD SEQUELIZE OBJECT TO DB INSTANCE
db.sequelize = Sequelize;
console.log('Done loading entities ...');



// ASSOCIATE ENTITIES

// DOMAIN :: USER
db.Secret.belongsTo(db.User, {foreignKey: 'fk_user_secret', targetKey: 'id'});
db.Profile.hasOne(db.User, {foreignKey: 'fk_user_profile', targetKey: 'id'});
db.VerifyEmail.hasOne(db.User, {foreignKey: 'fk_user_verify', targetKey: 'id'});

// DOMAIN :: HISTORY



// DOMAIN :: PERSONA


console.log('Done associating entities ...');



// SYNC DB AND ITS ENTITIES
sequelize.sync( {force: true});


// EXPORT INSTANCE

module.exports = db;
