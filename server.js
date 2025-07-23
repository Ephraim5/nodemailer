const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER || 'ahitubephriam5@gmail.com',
    pass: process.env.GMAIL_PASS || 'terx yasx sbkr bojf', // Replace with your App Password
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection verified');
  }
});

app.get('/send-email', async (req, res) => {
  // Get recipient email from query parameter (e.g., ?to=recipient@example.com)
  const recipient = req.query.to || 'deephraim5@gmail.com';

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(recipient)) {
    return res.status(400).send('Invalid recipient email address');
  }

  // Email options with spam-prevention tweaks
  const mailOptions = {
    from: '"Ahitub Chukwuemeka Ephraim" <ahitubephriam5@gmail.com>',
    to: recipient,
    replyTo: 'ahitubephriam5@gmail.com',
    subject: 'Welcome to My Service',
    text: 'Thank you for joining! Explore more at Ephraim Nodemailer test', // Replace with your real site
    html: `
      <h1>Welcome!</h1>
      <p>Thank you for joining my service.</p>
      <p><a href="https://google.com">Visit my site</a></p>
      <p><a href="https://google.com/">Unsubscribe here</a></p>
      <p>Sent by Ahitub Chukwuemeka Ephraim</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.send(`Email sent to ${recipient}: ${info.response}`);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));