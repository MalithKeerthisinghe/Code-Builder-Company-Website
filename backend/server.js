import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://www.codebuilder.it.com',
  'https://codebuilder.it.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

/*
|--------------------------------------------------------------------------
| Nodemailer Transport
|--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

/*
|--------------------------------------------------------------------------
| Contact Form Route
|--------------------------------------------------------------------------
*/

app.post('/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Email Content
    |--------------------------------------------------------------------------
    */

    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject: `New Contact Message From ${name}`,

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Form Submission</h2>

          <hr />

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone || 'Not provided'}
          </p>

          <p>
            <strong>Service:</strong>
            ${service || 'Not provided'}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="background:#f4f4f4; padding:15px; border-radius:8px;">
            ${message}
          </div>
        </div>
      `,
    };

    /*
    |--------------------------------------------------------------------------
    | Send Email
    |--------------------------------------------------------------------------
    */

    await transporter.sendMail(mailOptions);

    /*
    |--------------------------------------------------------------------------
    | Success Response
    |--------------------------------------------------------------------------
    */

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (error) {
    console.log('EMAIL ERROR:', error);

    /*
    |--------------------------------------------------------------------------
    | Error Response
    |--------------------------------------------------------------------------
    */

    res.status(500).json({
      success: false,
      message: 'Failed to send message',
    });
  }
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});