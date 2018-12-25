
// IMPORT LIBRARIES
const Sequelize = require('sequelize');


// CONFIG
const KEYS = require('../config/keys');
const pool = {max: 5, min: 0, acquire: 30000, idle: 10000};


// CONNECT TO DB
const sequelize = new Sequelize(KEYS.MYSQLURI, {
    pool: pool
});
console.log('Done connecting to database ...');


// DEFINE ENTITY PATH
const user_domain = './mysql/domains/user/';
const history_domain = './mysql/domains/history/';
const persona_domain = './mysql/domains/persona/';


// IMPORT ENTITY + OPTIONS
const { UserEntity, UserEntityOptions} = require(user_domain  + 'user.entity');
const { VerifyEmailEntity, VerifyEntityOptions } = require(user_domain  + 'verifyEmail.entity');
const { ProfileEntity, ProfileEntityOptions } = require(user_domain  + 'profile.entity');
const { EducationEntity, EducationEntityOptions } = require(user_domain  + 'education.entity');
const { HistoryEntity, HistoryEntityOptions } = require(user_domain  + 'history.entity');
const { PersonaEntity, PersonaEntityOptions } = require(user_domain  + 'persona.entity');
const { PhotoEntity, PhotoEntityOptions } = require(user_domain  + 'photo.entity');
const { SecretEntity, SecretEntityOptions } = require(user_domain  + 'secret.entity');
const { PersonalityEntity, PersonalityEntityOptions } = require(persona_domain  + 'personality.entity');
const { WorkEntity, WorkEntityOptions } = require(user_domain + 'work.entity');


// ADD ENTITIES TO SEQUELIZE - SERVER-SIDE
const db = {
    User: sequelize.define('user', UserEntity, UserEntityOptions),
    VerifyEmail: sequelize.define('verifyEmail', VerifyEmailEntity, VerifyEntityOptions),
    Profile: sequelize.define('profile', ProfileEntity, ProfileEntityOptions),
    Secret: sequelize.define('secret',SecretEntity, SecretEntityOptions),


    Education: sequelize.define('education', EducationEntity, EducationEntityOptions),
    Photo: sequelize.define('photo', PhotoEntity, PhotoEntityOptions),
    Work: sequelize.define('work', WorkEntity, WorkEntityOptions),

    History: sequelize.define('history', HistoryEntity, HistoryEntityOptions),

    Persona: sequelize.define('persona', PersonaEntity, PersonaEntityOptions),
    Personality: sequelize.define('personality',PersonalityEntity, PersonalityEntityOptions),
};



// ASSOCIATE ENTITIES - SERVER-SIDE

// DOMAIN :: USER
db.User.hasOne(db.Secret);
db.User.hasOne(db.Profile);
db.User.hasOne(db.VerifyEmail);

db.Secret.belongsTo(db.User);
db.Profile.belongsTo(db.User);
db.VerifyEmail.belongsTo(db.User, {foreignKey: 'fkUserId'}, { targetKey: 'id' });


// DOMAIN :: HISTORY


// DOMAIN :: PERSONA


console.log('Done associating entities ...');

// const k = Object.keys(db.VerifyEmail.rawAttributes);
// console.log(k);


// ADD SEQUELIZE INSTANCE + SEQUELIZE OBJECT TO DB OBJECT
db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log('Done loading entities ...');


// ADD UUID GENERATOR TO DB OBJECT
db.genUUID4 = require('uuid/v4');




// SYNC SEQUELIZE + PERSIST DEFINED ENTITIES WITH DATABASE - DB-SERVER
// sequelize.sync( {force: false});


// EXPORT DB INSTANCE; SERVER-SIDE

module.exports = db;
