// IMPORT LIBRARIES
const Sequelize = require('sequelize');

// CONFIG
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};

// CONNECT TO DB
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool,
    logging: false
});
console.log('Done connecting to database ...');


// DEFINE ENTITY PATH
const _ = './mysql/domains';

// IMPORT ENTITY + OPTIONS
const {UserEntity, UserEntityOptions} = require(_ + '/user/user.entity');
const {VerifyEmailEntity, VerifyEntityOptions} = require(_ + '/user/verifyEmail.entity');
const {ProfileEntity, ProfileEntityOptions} = require(_ + '/user/profile.entity');
const {EducationEntity, EducationEntityOptions} = require(_ + '/user/education.entity');
const {HistoryEntity, HistoryEntityOptions} = require(_ + '/user/history.entity');
const {PersonaEntity, PersonaEntityOptions} = require(_ + '/user/persona.entity');
const {PhotoEntity, PhotoEntityOptions} = require(_ + '/user/photo.entity');
const {SecretEntity, SecretEntityOptions} = require(_ + '/user/secret.entity');
const {PersonalityEntity, PersonalityEntityOptions} = require(_ + '/persona/personality.entity');
const {WorkEntity, WorkEntityOptions} = require(_ + '/user/work.entity');


// ADD ENTITIES TO SEQUELIZE - SERVER-SIDE
const db = {
    User: sequelize.define('user', UserEntity, UserEntityOptions),
    VerifyEmail: sequelize.define('verifyEmail', VerifyEmailEntity, VerifyEntityOptions),
    Profile: sequelize.define('profile', ProfileEntity, ProfileEntityOptions),
    Secret: sequelize.define('secret', SecretEntity, SecretEntityOptions),


    Education: sequelize.define('education', EducationEntity, EducationEntityOptions),
    Photo: sequelize.define('photo', PhotoEntity, PhotoEntityOptions),
    Work: sequelize.define('work', WorkEntity, WorkEntityOptions),

    History: sequelize.define('history', HistoryEntity, HistoryEntityOptions),

    Persona: sequelize.define('persona', PersonaEntity, PersonaEntityOptions),
    Personality: sequelize.define('personality', PersonalityEntity, PersonalityEntityOptions),
};


// ASSOCIATE ENTITIES - SERVER-SIDE

// DOMAIN :: USER

db.User.hasOne(db.VerifyEmail);

db.Secret.belongsTo(db.User);
db.Profile.belongsTo(db.User);
// db.VerifyEmail.belongsTo(db.User, {foreignKey: 'fkUserId', target: 'id', constraints: true});



console.log('Done associating entities ...');

// const k = Object.keys(db.VerifyEmail.rawAttributes);
// const u = Object.keys(db.User.rawAttributes);
// console.log(k);
// console.log(u);



// ADD SEQUELIZE INSTANCE + SEQUELIZE OBJECT TO DB OBJECT
db.sequelize = sequelize;
console.log('Done loading entities ...');


// ADD UUID GENERATOR TO DB OBJECT
db.genUUID4 = require('uuid/v4');


// SYNC SEQUELIZE + PERSIST DEFINED ENTITIES WITH DATABASE - DB-SERVER
sequelize.sync( {force: true});

// EXPORT DB INSTANCE; SERVER-SIDE

module.exports = db;




