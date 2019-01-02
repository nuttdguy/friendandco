const { DataTypes } = require('sequelize');

// describes Location
const Entity = {
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
};


const Options = {

};


module.exports = { Entity, Options };