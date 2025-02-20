require('dotenv').config({ path: './Config/.env' });
const nodemailer = require('nodemailer');

const sendEmail = async (object) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_Service,
        port: process.env.SMTP_PORT,
        host: process.env.HOST_NAME,
        secure: true,
        auth: {
            user: process.env.SMTP_Mail,
            pass: process.env.SMTP_Password
        }
    });
    
    const mailObject = {
        from: process.env.SMTP_Mail,
        to: object.email,
        subject: object.subject,
        text: object.message,
        attachments: Array.isArray(object.attachments) ? object.attachments : []
    };

    try {
        let info = await transporter.sendMail(mailObject);
        console.log("Email sent successfully:", info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
