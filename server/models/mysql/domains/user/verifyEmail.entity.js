const { DataTypes } = require('sequelize');

const VerifyEmail = {

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
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    hasActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isRecoverPassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

};

module.exports = VerifyEmail;