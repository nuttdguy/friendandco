const { DataTypes } = require('sequelize');

const PersonaEntity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },

};

const PersonaOptions = {

};


module.exports = { PersonaEntity, PersonaOptions };