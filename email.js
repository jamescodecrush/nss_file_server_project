// email.js
const express = require('express');
const nodemailer = require('nodemailer');
const pool = require('./app');

const router = express.Router();

// Send file to email
router.post('/send-email', async (req, res) => {
  try {
    const { fileId, email } = req.body;

    // Retrieve the file path from the database
    const [rows] = await pool.execute('SELECT file_path FROM files WHERE id = ?', [fileId]);
    const file = rows[0];

    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    // Setting up the email transporter
    const transporter = nodemailer.createTransport({
    

        service: 'Gmail',
        auth: {
          user: 'jamesquansah2020@gmail.com',
          pass: '00000000000',
        },
      });


    

    // Send the email with the file attachment
    await transporter.sendMail({
      from: 'your-email@example.com',
      to: email,
      subject: 'File Attachment',
      text: 'Please find the attached file.',
      attachments: [{ path: file.file_path }],
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
