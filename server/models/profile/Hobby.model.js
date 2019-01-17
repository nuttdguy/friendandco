module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Hobby', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },


    });

    return Model;
};