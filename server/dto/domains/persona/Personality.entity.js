const { DataTypes } = require('sequelize');


const Entity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
};

const Options = {

};


module.exports = { Entity, Options };