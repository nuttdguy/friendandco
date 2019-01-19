
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
            primaryKey: true,
            //     foreignKey: true,
            //     allowNull: false,
            //     references: {
            //         model: 'users',
            //         key: 'id'
            //     },
            // },
        },
    });

    return Model;
};