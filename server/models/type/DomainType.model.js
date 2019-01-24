module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('DomainType', {


        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    });

    return Model;
};