// In server/models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: { // We'll store the icon name as a string (e.g., 'briefcase')
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;