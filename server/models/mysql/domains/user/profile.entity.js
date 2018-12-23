const { DataTypes } = require('sequelize');
const uuid4 = require('uuid/v4');


// TODO determine relationships with other entities
module.exports = {

    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: uuid4()},
    educationId: {type: DataTypes.UUID },
    historyId: {type: DataTypes.UUID },
    personaId: {type: DataTypes.UUID },
    photoId: {type: DataTypes.UUID },
    userId: {type: DataTypes.UUID },
    workId: {type: DataTypes.UUID }

};

