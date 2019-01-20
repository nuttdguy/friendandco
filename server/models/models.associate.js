
module.exports = (sequelize) => {
    const {
        DomainType,
        Profile,
        User,
        Verify
    } = sequelize.models;


    User.hasOne(Verify, { foreignKey: 'id' });
    User.hasOne(Profile, { foreignKey: 'userId' });
    DomainType.hasOne(Profile, { foreignKey: 'domainTypeId'});

    // Verify.belongsTo(User, {foreignKey: 'verify', sourceKey: 'id'});
    // Profile.belongsTo(User, {foreignKey: 'profile', sourceKey: 'id'});




    console.log('done associating models ... 00000');
};
