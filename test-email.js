require('dotenv').config();
const sendEmail = require('./src/utils/sendEmail');

const sendTestEmail = async () => {
    try {
        console.log('Testing Email Service using centralized utility...');

        const result = await sendEmail({
            email: process.env.EMAIL_USER || 'test@example.com',
            subject: "Test Email from Utility",
            message: "This is a test email to verify the robust sendEmail utility.",
            html: "<p>This is a test email to verify the robust <strong>sendEmail</strong> utility.</p>"
        });

        console.log("-----------------------------------------");
        console.log("Result:", result);
        if (result.preview) {
            console.log("PREVIEW LINK:", result.preview);
        }
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

sendTestEmail();
