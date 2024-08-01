const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  responses: { type: Number, default: 0 },
  respondedUsers: { type: [String], default: [] }, // Track user responses
});

module.exports = mongoose.model('Meeting', meetingSchema);