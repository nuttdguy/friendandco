

module.exports = (sequelize, DataTypes) => {

    // Activity Models
    require('./activity/Activity.model')(sequelize, DataTypes);
    require('./activity/Kind.model')(sequelize, DataTypes);
    require('./activity/Scene.model')(sequelize, DataTypes);
    require('./activity/Tag.model')(sequelize, DataTypes);


    // Profile Models
    require('./profile/Education.model')(sequelize, DataTypes);
    require('./profile/History.model')(sequelize, DataTypes);
    require('./profile/Hobby.model')(sequelize, DataTypes);
    require('./profile/Interest.model')(sequelize, DataTypes);
    require('./profile/Location.model')(sequelize, DataTypes);
    require('./profile/Persona.model')(sequelize, DataTypes);
    require('./profile/Photo.model')(sequelize, DataTypes);
    require('./profile/Profile.model')(sequelize, DataTypes);
    require('./profile/ProfileCategory.model')(sequelize, DataTypes);
    require('./profile/Work.model')(sequelize, DataTypes);


    // Persona Models
    require('./persona/Personality.model')(sequelize, DataTypes);


    // User Models
    require('./user/User.model')(sequelize, DataTypes);
    require('./user/Verify.model')(sequelize, DataTypes);

    console.log('done adding database models ...');

    // Object.keys(db).forEach(modelName => {
    //   if (db[modelName].associate) {
    //     db[modelName].associate(db);
    //   }
    // });

};

