module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Activity', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
            validate: {
                isUUID: 4
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'CK_Activity'
        },
        city: {
            type: DataTypes.STRING,
            unique: 'CK_Activity'
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'CK_Activity'
        },
        zip: {
            type: DataTypes.STRING,
        },
        address1: {
            type: DataTypes.STRING,
        },
        address2: {
            type: DataTypes.STRING,
        },
        latitude: {
            type: DataTypes.FLOAT,
        },
        longitude: {
            type: DataTypes.FLOAT,
        },
        beginDate: {
            type: DataTypes.DATEONLY,
            default: Date.now()
        },
        endDate: {
            type: DataTypes.DATEONLY,
            default: Date.now()
        },
        beginTime: {
            type: DataTypes.TIME,
            default: Date.now()
        },
        endTime: {
            type: DataTypes.TIME,
            default: Date.now()
        },
        url: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        createdBy: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

    });

    return Model;
};




