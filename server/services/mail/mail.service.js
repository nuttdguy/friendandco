const nodemailer = require('nodemailer');
const KEYS = require('../../config/keys');


// create reusable transporter object using the default SMTP transport
const createTransporter = () => {

    return nodemailer.createTransport({
        host: KEYS.EMAIL_HOST,
        port: KEYS.PORT,
        secure: KEYS.SECURE, // true for 465, false for other ports
        auth: {
            user: KEYS.AUTH_USER_GMAIL, // generated ethereal profile
            pass: KEYS.AUTH_USER_PASS  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: KEYS.REJECT_UNAUTHORIZED
        }
    })
};


// send verify email
const sendMail = async (mailOptions) => {
    let result = null;

    const transporter = await createTransporter();
    // const mailOptions = await setMailOptions(payload);
    result = await transporter.sendMail(mailOptions);

    console.log('Done sending email verification ...');
    return result;
};



module.exports = {
    sendMail
};

