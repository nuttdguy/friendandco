module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Verify', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            foreignKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
    });

    return Model;
};