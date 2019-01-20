
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Education', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        industry: {
            type: DataTypes.STRING
        },
        specialty: {
            type: DataTypes.STRING
        }

    });

    return Model;
};
