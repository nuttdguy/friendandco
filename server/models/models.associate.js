
module.exports = (sequelize) => {
    const {
        DomainType,
        Profile,
        User,
        Verify
    } = sequelize.models;


    // User.hasOne(Verify, { foreignKey: 'userId' });
    // User.hasOne(Profile, { foreignKey: 'userId' });

    // User.hasOne(Verify, { foreignKey: 'id', targetKey: 'id' });
    DomainType.hasOne(Profile, { foreignKey: 'domainTypeId'});


    // Working relationship
    User.hasOne(Verify, {foreignKey: 'id', onDelete: 'cascade'});
    User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'cascade'});
    Verify.belongsTo(User, {foreignKey: 'id', targetKey: 'id'});

    console.log('done associating models ... 00000');
};
