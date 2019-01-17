
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Profile',{

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        fkUserId: {
            type: DataTypes.UUID,
            foreignKey: {
                references: 'id',
                model: 'users'
            }
        },
    });

    return Model;
};