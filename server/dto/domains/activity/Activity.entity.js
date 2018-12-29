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
    scene: {
        type: DataTypes.STRING,
    },
    kind: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
    },
    beginDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
    beginTime: {
        type: DataTypes.INTEGER
    },
    endTime: {
        type: DataTypes.INTEGER
    },
    minActor: {
        type: DataTypes.INTEGER,
    },
    maxActor: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    location: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    }

};

const Options = {

};


module.exports = { Entity, Options };