const { DataTypes } = require('sequelize');

const PhotoEntity = {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    // educationId: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // historyId: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // personaId: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // photoId: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // },
    // workId: {
    //     type: DataTypes.UUID,
    //     allowNull: false
    // }

};

const PhotoEntityOptions = {
    underscored: true
};


module.exports = {PhotoEntity, PhotoEntityOptions};