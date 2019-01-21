module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Verify', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            // foreignKey: 'id',
            // references: {
            //     model: 'Users',
            //     key: 'id'
            // }
        },
    });

    return Model;
};