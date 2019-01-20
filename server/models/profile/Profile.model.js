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
            foreignKey: true,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        domainName: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'domainNames',
                key: 'id'
            },
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