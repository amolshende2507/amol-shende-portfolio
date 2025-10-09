// Import all necessary libraries
require('dotenv').config(); // To load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Project = require('./models/Project'); 
const app = express();

// === MIDDLEWARE ===
// Use CORS to allow cross-origin requests
app.use(cors());
// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());


// === DATABASE CONNECTION ===
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Call the function to connect to the database
connectDB();


const PORT = process.env.PORT || 5000;

// === API ROUTES ===

// Simple test route to check if the server is up
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the backend server!' });
});

// The main route for handling the contact form submission
app.post('/api/contact', async (req, res) => {
    // Destructure the form data from the request body
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Set up the email transporter using Nodemailer
    // This uses the credentials from your .env file
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // Nodemailer now uses the credentials you provided
            user: process.env.EMAIL_USER, // <-- Reads 'your.email.address@gmail.com'
            pass: process.env.EMAIL_PASS, // <-- Reads 'abdcdefghijklmnop'
        },
    });

    // Define the email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email
        to: process.env.EMAIL_USER,    // The email where you want to receive messages
        subject: `New Portfolio Contact from ${name}`,
        html: `
      <h3>New Message from Portfolio Contact Form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    };

    // Try to send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        // Send a success response back to the client
        res.status(200).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        // Send an error response back to the client
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});
app.get('/api/projects', async (req, res) => {
  try {
    // 1. Use the Project model to find all documents in the 'projects' collection.
    // The .sort({ createdAt: -1 }) will sort the projects by newest first.
    const projects = await Project.find({}).sort({ createdAt: -1 });

    // 2. Send the projects back to the client as a JSON response.
    res.json(projects);
  } catch (error) {
    // 3. If something goes wrong, log the error and send a server error status.
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});