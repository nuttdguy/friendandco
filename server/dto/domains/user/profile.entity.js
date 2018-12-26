const { DataTypes } = require('sequelize');

const ProfileEntity = {

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

const ProfileEntityOptions = {
    underscored: true
};


module.exports = {ProfileEntity, ProfileEntityOptions};