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
    logging: true
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
// sequelize.sync();
// sequelize.sync({force: true})
//     .then(res => {
//         console.log('done connecting to database ... ', '00003');
//     }).catch(err => {
//         console.log('errors trying to connect to db ... ', err);
// });


// export db
module.exports = db;