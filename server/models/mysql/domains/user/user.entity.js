const {DataTypes} = require('sequelize');

const User = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        validate: {
            isUUID: 4
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
};


module.exports = User;

