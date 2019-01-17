// describes tags; e.g. adventure, fun, drink
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('ActivityTag',  {
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
        timeUsed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: 4
            }
        }
    });

    return Tag;
};