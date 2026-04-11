const sendEmail = require('../utils/sendEmail');

exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BookStore</title>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
        
        /* Layout */
        body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f1f5f9; padding-bottom: 40px; }
        .main-table { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-spacing: 0; }
        
        /* Content */
        .headers { background-color: #0f172a; padding: 40px 0; text-align: center; }
        .logo-text { color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
        
        .hero-image { width: 100%; height: auto; display: block; border-bottom: 4px solid #0ea5e9; }
        
        .content { padding: 40px 40px 20px 40px; color: #334155; line-height: 1.6; }
        h1 { color: #1e293b; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.5px; }
        p { font-size: 16px; margin: 0 0 24px 0; color: #475569; }
        
        .features-list { list-style: none; padding: 0; margin: 0 0 32px 0; }
        .feature-item { padding: 12px 0; border-bottom: 1px solid #e2e8f0;font-size: 15px; color: #334155; display: flex; align-items: start; }
        .feature-icon { margin-right: 12px; font-size: 18px; }
        
        .cta-button { display: inline-block; background-color: #0ea5e9; color: #ffffff !important; padding: 16px 36px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; text-align: center; width: auto; transition: background-color 0.3s ease; }
        .cta-button:hover { background-color: #0284c7; }
        
        .footer { background-color: #f8fafc; padding: 32px 20px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer-text { font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 12px; }
        .social-links a { color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600; font-size: 12px; }
        
        /* Mobile */
        @media screen and (max-width: 600px) {
            .content { padding: 30px 24px; }
            .logo-text { font-size: 24px; }
            h1 { font-size: 22px; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main-table" align="center">
            <!-- Header -->
            <tr>
                <td class="headers">
                     <!-- Replace with actual logo URL if available -->
                   <p class="logo-text">BookStore</p>
                </td>
            </tr>
            
            <!-- Hero Image -->
            <tr>
                <td>
                    <img src="https://images.unsplash.com/photo-1507842217121-9e93c8aaf27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Library" class="hero-image" width="600">
                </td>
            </tr>

            <!-- Main Content -->
            <tr>
                <td class="content">
                    <h1>Welcome to the Inner Circle! 🌟</h1>
                    <p>Hi Book Lover,</p>
                    <p>Required reading just got a whole lot more exciting. By joining our newsletter, you've secured a front-row seat to the literary world's best-kept secrets.</p>
                    
                    <p><strong>What can you expect from us?</strong></p>
                    <ul class="features-list">
                        <li class="feature-item"><span class="feature-icon">🔥</span>Curated lists of this week's top-trending titles</li>
                        <li class="feature-item"><span class="feature-icon">💎</span>Exclusive 24-hour flash sales for members only</li>
                        <li class="feature-item"><span class="feature-icon">🎤</span>Interviews with your favorite bestselling authors</li>
                    </ul>
                    
                    <p>Ready to find your next obsession?</p>
                    
                    <div style="text-align: center; margin-top: 10px; margin-bottom: 20px;">
                        <a href="http://localhost:3000" class="cta-button">Browse Collection</a>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                    <p class="footer-text">
                        &copy; ${new Date().getFullYear()} BookStore. Handcrafted with ❤️ by <strong>Abhinav Chauhan</strong>, <em>Software Developer</em>.<br>
                        123 Literary Avenue, Booktown, BK 10101
                    </p>
                    <div class="social-links">
                        <a href="#">Twitter</a> &bull;
                        <a href="#">Instagram</a> &bull;
                        <a href="#">LinkedIn</a>
                    </div>
                    <p class="footer-text" style="margin-top: 20px;">
                        You received this email because you signed up on our website.<br>
                        <a href="#" style="color: #0ea5e9; text-decoration: underline;">Unsubscribe</a> | <a href="#" style="color: #64748b; text-decoration: underline;">View in Browser</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
        `;

        // Use the centralized sendEmail utility
        const result = await sendEmail({
            email,
            subject: "Welcome to BookStore Newsletter! 📚",
            message: "Thank you for subscribing to our newsletter! Stay tuned for updates.",
            html
        });

        if (result.preview) {
            console.log('\n**************************************************************');
            console.log('* 📧  EMAIL PREVIEW LINK (CLICK TO VIEW)                     *');
            console.log('**************************************************************');
            console.log(result.preview);
            console.log('**************************************************************\n');
        } else {
            console.log("Message sent via " + (process.env.EMAIL_USER ? "Gmail" : "SMTP"));
        }

        res.status(200).json({
            success: true,
            message: 'Subscription successful! Check your email.',
            preview: result.preview // Send preview link to frontend if available
        });

    } catch (error) {
        console.error('Newsletter Error Details:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send email cleanly.',
            error: error.message
        });
    }
};
