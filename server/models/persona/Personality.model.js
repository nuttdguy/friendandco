module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Persona', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },


    });

    return Model;
};