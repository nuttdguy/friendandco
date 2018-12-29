const { DataTypes } = require('sequelize');

const Entity = {
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

const Options = {

};


module.exports = { Entity, Options };