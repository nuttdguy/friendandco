const { DataTypes } = require('sequelize');



const VerifyEmailEntity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hasActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isRecoverPassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fkUserId: {
        type: DataTypes.UUID,
        foreignKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
};

const VerifyEntityOptions = {
    // underscored: true
};



module.exports = { VerifyEmailEntity, VerifyEntityOptions };