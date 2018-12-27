const { DataTypes } = require('sequelize');



const VerifyEmailEntity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
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
    isVerifyEmail: {
        type: DataTypes.BOOLEAN
    },
    isRecoverPassword: {
        type: DataTypes.BOOLEAN
    },
    fkUserId: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
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