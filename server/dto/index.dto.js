// connect to db
const { Promise } = require('express');

const sequelize = require('./db.connection');


// entity path
const user_domain = './domains/user';
const persona_domain = './domains/persona';
const activity_domain = './domains/activity';

// IMPORT ENTITY + OPTIONS
const User = require(user_domain + '/User.entity');
const VerifyEmail = require(user_domain + '/VerifyEmail.entity');
const Secret = require(user_domain + '/Secret.entity');

const Profile = require(user_domain + '/profile/Profile.entity');
const Education = require(user_domain + '/profile/Education.entity');
const History = require(user_domain + '/profile/History.entity');
const Persona = require(user_domain + '/profile/Persona.entity');
const Photo = require(user_domain + '/profile/Photo.entity');
const Work = require(user_domain + '/profile/Work.entity');

const Personality = require(persona_domain + '/Personality.entity');

const Activity = require(activity_domain + '/Activity.entity');
const Kind = require(activity_domain + '/Kind.entity');
const Scene = require(activity_domain + '/Scene.entity');
const Tag = require(activity_domain + '/Tag.entity');


// add entities to sequelize - app server-side
const db = {
    User: sequelize.define('user', User.Entity, User.Options),
    VerifyEmail: sequelize.define('verifyEmail', VerifyEmail.Entity, VerifyEmail.Options),
    Profile: sequelize.define('profile', Profile.Entity, Profile.Options),
    Secret: sequelize.define('secret', Secret.Entity, Secret.Options),


    Education: sequelize.define('education', Education.Entity, Education.Options),
    Photo: sequelize.define('photo', Photo.Entity, Photo.Options),
    Work: sequelize.define('work', Work.Entity, Work.Options),

    History: sequelize.define('history', History.Entity, History.Options),

    Persona: sequelize.define('persona', Persona.Entity, Persona.Options),
    Personality: sequelize.define('personality', Personality.Entity, Personality.Options),

    Activity: sequelize.define('activity', Activity.Entity, Activity.Options),
    Kind: sequelize.define('kind', Kind.Entity, Kind.Options),
    Scene: sequelize.define('scene', Scene.Entity, Scene.Options),
    Tag: sequelize.define('tag', Tag.Entity, Tag.Options),
};


// associate entities :: app server-side

// domain :: user
db.User.hasOne(db.VerifyEmail);

db.VerifyEmail.belongsTo(db.User, {foreignKey: 'fkUserId', target: 'id', constraints: true});
db.Secret.belongsTo(db.User);
db.Profile.belongsTo(db.User);

// domain :: activity



console.log('done associating entities ...');


// add sequelize instance + sequelize object to db object
db.sequelize = sequelize;
console.log('done loading entities ...');


// add uuid generator to db object
db.genUUID4 = require('uuid/v4');



async function seedDb() {

    // sync sequelize + persist defined entities with database - db server-side
    await sequelize.drop();  console.log('dropping db ... ');
    await sequelize.sync( {force: true});  console.log('synchronizing db ... ');


    try {
        console.log('begin seeding ... ');

        const userIds = await require ('./seed.data').genId(5);
        const passwords = await require('./seed.data').genPassword(5);

        await db.User.bulkCreate(require('./seed.data').users(userIds, passwords));

        const kind = await require ('./seed.data').genId(5);
        await db.Kind.bulkCreate(require('./seed.data').kind(kind, userIds));

        const scene = await require ('./seed.data').genId(5);
        await db.Scene.bulkCreate(require('./seed.data').scene(scene, userIds));

        const tag = await require ('./seed.data').genId(5);
        await db.Tag.bulkCreate(require('./seed.data').tag(tag, userIds));

        const actIds= await require ('./seed.data').genId(5);
        db.Activity.bulkCreate(require('./seed.data').activity(actIds, scene, kind, userIds));


        console.log('done seeding data ... ');
    } catch (e) {
        console.log(e)
    }
}

seedDb();


// export db instance; app server-side
module.exports = db;




