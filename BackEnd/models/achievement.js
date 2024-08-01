const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  imageUrl: String,
  description: String, // Add any other fields as needed
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;