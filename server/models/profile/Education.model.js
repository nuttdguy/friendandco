
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Education', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

    });

    return Model;
};
