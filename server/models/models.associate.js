
module.exports = (sequelize) => {
    const {
        DomainType,
        Profile,
        User,
        Verify
    } = sequelize.models;



    // user has 1 verify record
    // User.hasOne(Verify, {foreignKey: 'id', onDelete: 'cascade'});

    // User + Profile relationships
    User.hasOne(Verify, {foreignKey: 'id', constraints: false});

    // Profile relationships
    Profile.hasMany(User, {foreignKey: 'id', sourceKey: 'userId', onDelete: 'cascade', constraints: true});
    Profile.hasMany(DomainType, {foreignKey: 'id', sourceKey: 'domainTypeId'});


    // Verify belongs
    // Verify.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

    console.log('done associating models ... 00000');
};
