// LOAD MODULE + LIBRARIES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const { createTransporter, setMailOptions } = require('../mail/mail.service');



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
        throw e;
    }

};


// compare password with existing using an available bcrypt library function
const bcryptCompare = async (password, userToken) => {
    return await bcrypt.compare(password, userToken);
};


// sign payload using an available jwt library function
const signJwt = async (payload) => {
    return await jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600});
};


// send verify email
const sendMail = async (payload) => {
    const transporter = await createTransporter();
    const mailOptions = await setMailOptions(payload);

    return await transporter.sendMail(mailOptions);
};




module.exports = {
    generateUUID4,
    bcryptPassword,
    bcryptCompare,
    signJwt,
    sendMail
};