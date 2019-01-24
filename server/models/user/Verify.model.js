module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Verify', {

        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        // },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            foreignKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
    });

    return Model;
};