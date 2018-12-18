const nodemailer = require('nodemailer');
const KEYS = require('../../config/keys');


// create reusable transporter object using the default SMTP transport
const createTransporter = () => {

    return nodemailer.createTransport({
        host: KEYS.EMAIL_HOST,
        port: KEYS.PORT,
        secure: KEYS.SECURE, // true for 465, false for other ports
        auth: {
            user: KEYS.AUTH_USER_GMAIL, // generated ethereal user
            pass: KEYS.AUTH_USER_PASS  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: KEYS.REJECT_UNAUTHORIZED
        }
    })
};


// setup email data with unicode symbols
const setMailOptions = (userData, verifyUrl) => {

    // TODO will require users verification url
    return {
        from: KEYS.AUTH_USER_GMAIL,
        to: verifyUrl.userEmail,
        subject: 'Please confirm registration',
        html: htmlData(userData, verifyUrl)
    }

};

const htmlData = (userData, verifyUrl) => {
    return `
     <html>
         <body>
            <p>Please confirm your registration by clicking this link</p> <br>
            <a href="http://localhost:5000/api/user/verify/${verifyUrl.userId}">
            Verify email</a>
        </body>
    </html>`;
};


module.exports = {
    createTransporter: createTransporter,
    setMailOptions: setMailOptions
};

