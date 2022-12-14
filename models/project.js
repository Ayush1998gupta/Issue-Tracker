const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  lable: {
    type: String,
    required: true,
    lowercase: true,
  },
  authorName: {
    type: String,
    required: true,
    lowercase: true,
  },
  projectId: {
    type: String,
    ref: 'Project',
    required: true,
  },
});

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
  issues: [issueSchema],
});

module.exports = mongoose.model('Project', projectSchema);
