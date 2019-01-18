// describes profile categories
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('ProfileCategory', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            validate: {
                isUUID: 4
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
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
            allowNull: true,
            validate: {
                isUUID: 4
            }
        },
        fkProfileId: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                isUUID: 4
            }
        },
    });

    return Model;
};
