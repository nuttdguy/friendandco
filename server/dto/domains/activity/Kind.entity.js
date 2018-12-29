const { DataTypes } = require('sequelize');

// describes kind; sports, recreation, adventure, etc
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
        allowNull: false,
    }
};


const Options = {

};


module.exports = { Entity, Options };