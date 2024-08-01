const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
