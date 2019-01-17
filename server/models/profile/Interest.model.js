module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Interest', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },


    });

    return Model;
};