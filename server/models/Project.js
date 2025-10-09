const mongoose = require('mongoose');

// A Schema is a blueprint that defines the structure of our documents.
const projectSchema = new mongoose.Schema({
  // 'title' is a field in our document.
  // It must be a String and it is required (cannot be empty).
  title: {
    type: String,
    required: true,
    trim: true // Removes any whitespace from the beginning and end.
  },
  description: {
    type: String,
    required: true
  },
  // 'technologies' will be an array of strings.
  technologies: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // 'githubUrl' and 'liveUrl' are optional, so they don't have 'required: true'.
  githubUrl: {
    type: String
  },
  liveUrl: {
    type: String
  },
  category: {
    type: String,
    required: true
  }
}, {
  // This option adds 'createdAt' and 'updatedAt' fields automatically.
  timestamps: true
});

// A Model is a wrapper around the Schema that allows us to interact with the database collection.
// mongoose.model('Project', projectSchema) will create/use a collection named 'projects' (pluralized) in MongoDB.
const Project = mongoose.model('Project', projectSchema);

// Export the model so we can use it in other files (like index.js).
module.exports = Project;