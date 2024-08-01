const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
