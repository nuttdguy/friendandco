module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Work', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },


    });

    return Model;
};