// LOAD MODULE + LIBRARIES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const KEYS = require('../../config/keys');




// encrypt password using an available bcrypt library function
async function bcryptPassword(payload){
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
}


// compare password with existing using an available bcrypt library function
async function bcryptCompare(payload, userAccount) {
    return await bcrypt.compare(payload.password, userAccount.password);
}


// sign payload using an available jwt library function
async function signJwt(payload) {
    return await jwt.sign(payload, KEYS.SECRET_JWT_KEY, {expiresIn: 3600});
}




module.exports = {
    bcryptPassword,
    bcryptCompare,
    signJwt,
};