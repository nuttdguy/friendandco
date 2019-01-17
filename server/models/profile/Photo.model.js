module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Photo', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },


    });

    return Model;
};