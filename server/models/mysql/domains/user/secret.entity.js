const { DataTypes } = require('sequelize');

const SecretEntity = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    passwordTok: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
};

const SecretEntityOptions = {

};


module.exports = { SecretEntity, SecretEntityOptions };