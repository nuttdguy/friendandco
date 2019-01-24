module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Profile', {


        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        domainTypeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return Model;
};