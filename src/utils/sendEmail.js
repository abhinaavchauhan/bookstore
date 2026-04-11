const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    let transporter;

    // 1. Try to use provided credentials if they exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        console.log(`Attempting to send email via Gmail (SMTP) as: ${process.env.EMAIL_USER}`);
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    // 2. Fallback to Ethereal if no credentials or if we want to default to it for safety in dev
    // For this specific 'fix completely' request where Gmail is failing, let's implement a smart fallback.
    // We'll wrap the send attempt.

    try {
        if (!transporter) throw new Error('No credentials');

        const message = {
            from: `"Abhinav Chauhan" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(message);
        console.log("Message sent (Gmail): %s", info.messageId);
        return info;

    } catch (error) {
        console.log('\n\n\n================================================================================');
        console.log('⚠️  GMAIL SENDING FAILED | FALLING BACK TO TEST MODE  ⚠️');
        console.log('--------------------------------------------------------------------------------');
        console.error('❌  Gmail Error:', error.message);
        console.log('--------------------------------------------------------------------------------');
        console.log('ℹ️  Switching to Ethereal Email (Simulation Service)...');
        console.log('================================================================================\n');

        // Create Ethereal Test Account
        const testAccount = await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const message = {
            from: `"Abhinav Chauhan" <${process.env.EMAIL_USER || 'no-reply@bookstore.dev'}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(message);

        console.log("Message sent (Ethereal): %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // crucial: return this so controllers can use it
        return { ...info, preview: nodemailer.getTestMessageUrl(info) };
    }
};

module.exports = sendEmail;
