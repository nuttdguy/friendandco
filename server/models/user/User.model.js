module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('User',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            field: 'id',
            validate: {
                isUUID: 4
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    });

    return Model;
};
