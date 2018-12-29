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
const bcryptPassword = async (payload, next) => {
    let salt, hash = null;

    try {
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(payload.password, salt);

        console.log(hash, 'HASHING PASSWORD DONE...');
        return hash;

    } catch (e) {
        // TODO add errors instance, object to handle error messages
        console.log('BCRYPT ERROR: ');
        console.log(e);
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