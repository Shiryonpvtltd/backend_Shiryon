const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors({
  origin: 'https://www.shiryon.in', 
}));
app.use(express.json());

app.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up transporter
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, 
    auth: {
      user: 'founders@shiryon.in',
      pass: process.env.MAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: 'founders@shiryon.in',
    to: 'founders@shiryon.in',
    subject: `Contact Form Submission from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err });
  }
});

module.exports = app;
