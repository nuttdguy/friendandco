// describes scene; e.g. outdoor, indoor, etc
module.exports = (sequelize, DataTypes) => {
    const Scene = sequelize.define('ActivityScene', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            validate: {
                isUUID: 4
            },
        },
        label: {
            type: DataTypes.STRING
        },
        desc: {
            type: DataTypes.STRING
        },
        timeUsed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });

    return Scene;
};
