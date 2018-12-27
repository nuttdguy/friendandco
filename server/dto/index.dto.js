// connect to db
const sequelize = require('./db.connection');


// entity path
const _ = './domains';

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


// add entities to sequelize - app server-side
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


// associate entities :: app server-side

// domain :: user

db.User.hasOne(db.VerifyEmail);

db.VerifyEmail.belongsTo(db.User, {foreignKey: 'fkUserId', target: 'id', constraints: true});
db.Secret.belongsTo(db.User);
db.Profile.belongsTo(db.User);

console.log('done associating entities ...');


// add sequelize instance + sequelize object to db object
db.sequelize = sequelize;
console.log('done loading entities ...');


// add uuid generator to db object
db.genUUID4 = require('uuid/v4');


// sync sequelize + persist defined entities with database - db server-side
sequelize.sync( {force: false});


// export db instance; app server-side
module.exports = db;




