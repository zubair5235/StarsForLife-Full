const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  responses: { type: Number, default: 0 },
  respondedUsers: { type: [String], default: [] }, 
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
