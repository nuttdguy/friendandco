const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');


const Personality = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
}