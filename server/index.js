// Import all necessary libraries
require('dotenv').config(); // To load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Project = require('./models/Project');
const app = express();
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { upload, cloudinary } = require('./config/cloudinaryConfig');
const Experience = require('./models/Experience');
// === MIDDLEWARE ===
const auth = require('./middleware/auth');
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
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. If credentials are correct, create a JWT
    const payload = {
      user: {
        id: user.id // We can use this ID later in protected routes
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // The token will expire in 1 hour
      (err, token) => {
        if (err) throw err;
        // 4. Send the token back to the client
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
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
// app.post('/api/projects', auth, async (req, res) => {
//   try {
//     // We get the project details from the request body.
//     const { title, description, technologies, imageUrl, githubUrl, liveUrl, category } = req.body;

//     // Create a new project instance using our Project model.
//     const newProject = new Project({
//       title,
//       description,
//       technologies,
//       imageUrl,
//       githubUrl,
//       liveUrl,
//       category
//     });

//     // Save the new project to the database.
//     const project = await newProject.save();

//     // Send the newly created project back as the response.
//     res.json(project);
//   } catch (error) {
//     console.error('Error creating project:', error);
//     res.status(500).json({ message: 'Server error while creating project' });
//   }
// });
// MODIFIED: POST route to create a new project (now with file upload)
app.post('/api/projects', auth, upload.single('image'), async (req, res) => {
  try {
    // req.file is now available thanks to Multer. It contains the uploaded file info from Cloudinary.
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const { title, description, technologies, githubUrl, liveUrl, category } = req.body;

    const newProject = new Project({
      title,
      description,
      // Technologies will be sent as a comma-separated string from the form data
      technologies: technologies.split(',').map(tech => tech.trim()),
      imageUrl: req.file.path, // URL from Cloudinary
      cloudinaryId: req.file.filename, // Unique ID from Cloudinary
      githubUrl,
      liveUrl,
      category
    });

    const project = await newProject.save();
    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error while creating project' });
  }
});
app.put('/api/projects/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, category } = req.body;

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // --- We will NOT handle image updates for now to keep it simple ---
    // A full implementation would delete the old image from Cloudinary (project.cloudinaryId)
    // and upload the new one if req.file exists.
    
    project.title = title;
    project.description = description;
    project.technologies = technologies.split(',').map(tech => tech.trim());
    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;
    project.category = category;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error while updating project' });
  }
});
// In server/index.js

// NEW: DELETE route to delete a project by ID (PROTECTED)
app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary
    // We use the 'cloudinary' library directly for this
    await cloudinary.uploader.destroy(project.cloudinaryId);

    // Delete project from MongoDB
    await project.deleteOne();

    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error while deleting project' });
  }
});
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ createdAt: 'desc' });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching experiences' });
  }
});
app.post('/api/experiences', auth, async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const experience = await newExperience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating experience' });
  }
});

app.put('/api/experiences/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating experience' });
  }
});

app.delete('/api/experiences/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting experience' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});