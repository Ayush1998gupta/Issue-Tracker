const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Project', projectSchema);
