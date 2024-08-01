const mongoose = require('mongoose');

// Replace 'mydatabase' with your actual database name
const DB_URL = 'mongodb+srv://madasamy22:2272004@cluster0.iw1dpbz.mongodb.net/stars-database?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Ensures indexes are created
  useFindAndModify: false // Disables deprecated methods
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define schemas and models using Mongoose
const Schema = mongoose.Schema;

// Example schema for files or images
const FileSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  subjectCode: { type: String },
  subjectName: { type: String },
  materialName: { type: String },
  contributor: { type: String }
});

// Create a model based on the schema
const File = mongoose.model('File', FileSchema);

// Export the models
module.exports = {
  File
};
