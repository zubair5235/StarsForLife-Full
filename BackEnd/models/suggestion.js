const mongoose = require('mongoose');
const User = require('./user'); 
const suggestionSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  facultyName: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  
  
  ratingsCount: {
    type: Number,
    default: 0,
  },
 
 
  respondedUsers: {
    type: [String],
    default: [],
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;
