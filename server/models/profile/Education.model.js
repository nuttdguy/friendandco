
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Education', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },

    });

    return Model;
};
