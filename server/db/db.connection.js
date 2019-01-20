// import Sequelize ORM
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const db = {};

// config connection
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};


// connect to db
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool,
    logging: false
});

// add models
require('../models/index.models')(sequelize, Sequelize.DataTypes);
require('../models/models.associate')(sequelize);


// add UUID generator to sequelize
db.genUUID4 = uuid;


// add Sequelize and sequelize connection instance to db
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// sync db

sequelize.sync();
// sequelize.sync({force: true});

console.log('done syncing database ...');


// export db
console.log('done connecting to database ... ', '00003');
module.exports = db;