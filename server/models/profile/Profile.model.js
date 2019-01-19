
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Profile',{

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fkUserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            foreignKey: {
                references: 'id',
                model: 'users'
            }
        },
    });

    return Model;
};