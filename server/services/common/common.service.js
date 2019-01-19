// LOAD MODULE + LIBRARIES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const KEYS = require('../../config/keys');



// SERVICES :: USING EXTERNAL LIBRARIES
///////////////////////////////

const generateUUID4 = (config = {}) => {
    return uuidV4(config);
};


// encrypt password using an available bcrypt library function
const bcryptPassword = async (payload) => {
    const saltRounds = 10; let hash = null;

    try {
        hash = await bcrypt.hash(payload.password, saltRounds);
        console.log('done hashing password ... ', hash);

        return hash;

    } catch (e) {
        // TODO add errors instance, object to handle error messages
        console.log('bcrypt error: ', e);
        return e;
    }

};


// compare password with existing using an available bcrypt library function
const bcryptCompare = async (payload, foundUser) => {
    return await bcrypt.compare(payload.password, foundUser.password);
};


// sign payload using an available jwt library function
const signJwt = async (payload) => {
    return await jwt.sign(payload.dataValues, KEYS.SECRET_JWT_KEY, {expiresIn: 3600});
};






module.exports = {
    generateUUID4,
    bcryptPassword,
    bcryptCompare,
    signJwt,
};