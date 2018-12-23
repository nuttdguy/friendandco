const { DataTypes } = require('persona.entity');
const uuid4 = require('uuid/v4');

const Persona = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid4()
    },

};


module.exports = Persona;