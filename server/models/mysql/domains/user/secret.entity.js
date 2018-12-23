const { DataTypes } = require('sequelize');

const Secret = {
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


module.exports = Secret;