



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

// --- UPDATED CORS WHITELIST ---
const whitelist = [
  'https://amolshende.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Parse JSON
app.use(bodyParser.json());

// === DATABASE CONNECTION ===
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;

// --- TEST ROUTE ---
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend server!' });
});

// --- CONTACT FORM ROUTE ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
console.log("BREVO KEY:", process.env.BREVO_SMTP_KEY);

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Contact from ${name}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error); // This log is crucial!
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// ============================
// AUTH ROUTES
// ============================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ============================
// PROJECT ROUTES
// ============================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
});

// CREATE Project with Image Upload
app.post('/api/projects', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded.' });

    const { title, description, technologies, githubUrl, liveUrl, category } = req.body;

    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename,
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

// UPDATE Project
app.put('/api/projects/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, category } = req.body;

    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

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

// DELETE Project
app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await cloudinary.uploader.destroy(project.cloudinaryId);
    await project.deleteOne();

    res.json({ message: 'Project removed successfully' });

  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error while deleting project' });
  }
});

// ============================
// EXPERIENCE ROUTES
// ============================
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

// ============================
// START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
