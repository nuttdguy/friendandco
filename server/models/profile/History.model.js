module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('History', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },

    });

    return Model;
};