const nodemailer = require("nodemailer");

const sendEmail = async (message, receipt) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
          
        let mailOptions = {
            from: '<noreply@example.com>',
            to: receipt,
            subject: 'Password Reset',
            text: message
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(`Error: ${error}`)
                res.status(400).send(error)
            } else {
                console.log("Message is sent successfully")
                res.status(200).send("Thank you! Your message is sent successfully.");
            }
        });

    } catch(e) {
        console.log(e)
    }

}

module.exports = sendEmail;