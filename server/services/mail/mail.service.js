module.exports = class Mail  {

    constructor() {
        this.nodeMailer = require('nodemailer');
        this.transporter = null;
        this.emailOptions = null;
        this.html = null;
    }

    createTransporter(host, port, secure, authEmail, authPass, isTls) {
        this.transporter = this.nodeMailer.createTransport({
            host: host,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
                user: authEmail, // generated ethereal profile
                pass: authPass  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: isTls
            }
        });
    }

    // set the html template
    setHtml(userId, html = null) {

        if (html !== null) {
            this.html = `
             <html>
                 <body>
                    <p>Please confirm your registration by clicking this link</p> <br>
                    <a href="http://localhost:5000/api/auth/user/verify/${userId}">
                    Click to confirm your account</a>
                </body>
            </html>`
        } else {
            this.html = html;
        }
    }

    // set mail options
    setEmailOptions(from, to, subject) {
        this.emailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: this.html
        }
    }

    // send the email
    sendEmail() {
        return this.transporter.sendMail(this.emailOptions);
    }
};