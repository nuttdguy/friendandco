const db = require('../db/db.connection').sequelize;
const {DataTypes} = db.Sequelize;


// Activity Models
require('./activity/Activity.model')(db, DataTypes);
require('./activity/Kind.model')(db, DataTypes);
require('./activity/Scene.model')(db, DataTypes);
require('./activity/Tag.model')(db, DataTypes);


// Profile Models
require('./profile/Education.model')(db, DataTypes);
require('./profile/History.model')(db, DataTypes);
require('./profile/Hobby.model')(db, DataTypes);
require('./profile/Interest.model')(db, DataTypes);
require('./profile/Location.model')(db, DataTypes);
require('./profile/Persona.model')(db, DataTypes);
require('./profile/Photo.model')(db, DataTypes);
require('./profile/Profile.model')(db, DataTypes);
require('./profile/ProfileCategory.model')(db, DataTypes);
require('./profile/Work.model')(db, DataTypes);


// Persona Models
require('./persona/Personality.model')(db, DataTypes);


// User Models
require('./user/User.model')(db, DataTypes);
require('./user/VerifyEmail.model')(db, DataTypes);

console.log('done syncing database models ...');
// sync db
db.sync();


// export db
module.exports = db;




// 'use strict';
//
// const fs        = require('fs');
// const path      = require('path');
// const Sequelize = require('sequelize');
// const basename  = path.basename(__filename);
// const env       = process.env.NODE_ENV || 'development';
// const config    = require(__dirname + '/../config/config.json')[env];
// const db        = {};
//
// if (config.use_env_variable) {
//   let sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   let sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
//
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return file.slice(-3) !== '.js')
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });