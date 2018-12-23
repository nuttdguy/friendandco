
const { DataTypes } = require('sequelize');
const uuid4 = require('uuid/v4');

module.exports = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid4()
    },
    email: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false},
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'id'
        }
    }

};