
const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  email: String,
  regNo: String,
  name: String,
  batch: Number,
  branch: String,
  district: String,
  gender: String,
  mobileNumber: String,
  additionalMembers: Number,
  foodType: String,
  numberOfMales: Number,
  numberOfFemales: Number,
  arrivingDate: Date,
  additionalInfo: String,
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
