const {DataTypes} = require('sequelize');


const Entity = {
    id: {
        type: DataTypes.UUID,
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
    },
    endDate: {
        type: DataTypes.DATEONLY,
    },
    beginTime: {
        type: DataTypes.TIME,
    },
    endTime: {
        type: DataTypes.TIME,
    },
    url: {
        type: DataTypes.STRING,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    }

};

const Options = {

};


module.exports = { Entity, Options };