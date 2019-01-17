const { DataTypes } = require('sequelize');

const Entity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    fkUserId: {
        type: DataTypes.UUID,
        foreignKey: {
            references: 'id',
            model: 'users'
        }
    },
};

const Options = {
    underscored: true
};


module.exports = {Entity, Options};