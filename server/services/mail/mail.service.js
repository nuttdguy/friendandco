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
const setMailOptions = (payload) => {

    return {
        from: KEYS.AUTH_USER_GMAIL,
        to: payload.email,
        subject: 'Please confirm registration',
        html: htmlData(payload)
    }

};

const htmlData = (payload) => {
    return `
     <html>
         <body>
            <p>Please confirm your registration by clicking this link</p> <br>
            <a href="http://localhost:5000/api/user/verify/${payload.id}">
            Verify email</a>
        </body>
    </html>`;
};


module.exports = {
    createTransporter,
    setMailOptions
};

