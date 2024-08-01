
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const File = require('./models/file');
const Image = require('./models/image');
const Suggestion = require('./models/suggestion');
const Meeting = require('./models/meeting');
const Message = require('./models/message');
const User = require('./models/user');
const Alumni = require('./models/alumni');
const Achievement = require('./models/achievement');

const bcrypt = require('bcrypt');
const app = express();

const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  }
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Send email route
app.post('/send-email', async (req, res) => {
  const { message, year } = req.body;

  const newMessage = new Message({ message, year });

    // Save the message to MongoDB
    await newMessage.save();

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!year) {
    return res.status(400).json({ error: 'Year is required' });
  }

  try {
    // Fetch user emails based on the year from the database
    const users = await User.find({ year: year }, 'email').exec();
    // Send email to each user
    for (let i = 0; i < users.length; i++) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: users[i].email,
        subject: 'Message from STARS Coordinator',
        text: message,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent to', users[i].email);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
});




// Send email route for meetings
app.post('/send-emailmeeting', async (req, res) => {
  const { date, time, venue, title, to } = req.body;

  const meeting = new Meeting({
    date,
    time,
    venue,
    title,
    to
  });
  await meeting.save();

  console.log('Received meeting details:', { date, time, venue, title, to });

  if (!date || !time || !venue || !title || !to) {
    return res.status(400).json({ error: 'All meeting details are required' });
  }

  try {
     
    // Fetch user emails based on the year (to) from the database
    const users = await User.find({ year: to }, 'email').exec();


    if (!users.length) {
      return res.status(404).json({ error: 'No users found for the given year' });
    }

    // Create email content with meeting details
    const emailContent = `
      Meeting Title: ${title}
      Date: ${date}
      Time: ${time}
      Venue: ${venue}
      Kindly attend the meeting withot fail.
    `;

    // Send email to each user
    for (let i = 0; i < users.length; i++) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: users[i].email,
        subject: 'STARS Coordinator Schedled a Meeting',
        text: emailContent,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent to', users[i].email);
    }

    res.status(200).json({ message: 'Meeting scheduled and emails sent successfully' });
  } catch (error) {
    console.error('Error scheduling meeting and sending emails:', error);
    res.status(500).json({ error: 'An error occurred while scheduling meeting and sending emails' });
  }
});


app.get('/meeting-history', async (req, res) => {
  try {
    // Fetch all meetings from the database
    const meetings = await Meeting.find().exec();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meeting history:', error);
    res.status(500).json({ error: 'Error fetching meeting history' });
  }
});

app.get('/message-history', async (req, res) => {
  try {
    // Fetch all meetings from the database
    const message = await Message.find().exec();
    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching meeting history:', error);
    res.status(500).json({ error: 'Error fetching meeting history' });
  }
});




app.get('/api/users', async (req, res) => {
  console.log("hi");
  try {
    
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});


const upload = multer({ storage: storage });
app.post('/api/signup', async (req, res) => {
  const { name, year, department, regno, phone, district ,email, password } = req.body;
  console.log('hi backendd..........');

  try {
  
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      year,
      department,
      regno,
      phoneNumber: phone,
      district,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password is correct, login successful
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        // Add other fields as needed
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file', err);
      res.status(404).send('File not found');
    }
  });
});

app.post('/upload/image', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    const newImage = new Image({
      name: name || file.originalname,
      path: file.filename, // Save just the filename
    });

    await newImage.save();

    res.json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error uploading image', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { subjectCode, subjectName, materialName, contributor } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    const newFile = new File({
      name: file.originalname,
      path: file.filename, // Save just the filename
      subjectCode,
      subjectName,
      materialName,
      contributor,
    });

    await newFile.save();

    res.json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});


app.post('/api/suggestions', async (req, res) => {
  try {
    const { subjectCode, subjectName, facultyName, school, ratings } = req.body;

    const newSuggestion = new Suggestion({
      subjectCode,
      subjectName,
      facultyName,
      school,
      ratings,
    });

    await newSuggestion.save();

    res.json({ message: 'Suggestion added successfully', suggestion: newSuggestion });
  } catch (error) {
    console.error('Error adding suggestion', error);
    res.status(500).json({ error: 'Failed to add suggestion' });
  }
});

// Route to get all suggestions
app.get('/api/suggestions', async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.put("/api/suggestions/:id/updateRating", async (req, res) =>{
  try {
    const suggestionId = req.params.id;
    const newRating = parseFloat(req.body.rating); // Ensure the new rating is a number
    const userEmail = req.body.email; // User's email passed from frontend

    // Fetch the suggestion from the database
    const suggestion = await Suggestion.findById(suggestionId);

    // Check if user has already responded
    if (suggestion.respondedUsers.includes(userEmail)) {
      return res.status(400).json({ message: 'User has already responded' });
    }

    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }

    // Calculate the new average rating
    const totalRating = suggestion.ratings * suggestion.ratingsCount;
    const newTotalRating = totalRating + newRating;
    suggestion.ratingsCount += 1;
    suggestion.ratings = newTotalRating / suggestion.ratingsCount;

    // Add user to respondedUsers list
    suggestion.respondedUsers.push(userEmail);

    // Save the updated suggestion
    const updatedSuggestion = await suggestion.save();

    res.json(updatedSuggestion); // Return updated suggestion with new average rating
  } catch (error) {
    console.error('Error updating suggestion:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  const { email, regNo, name, batch,branch,district,gender,mobileNumber,
    additionalMembers,foodType, numberOfMales,numberOfFemales, arrivingDate, additionalInfo
   } = req.body;
   const alumni = new Alumni({
    email,
    regNo,
    name,
    batch,
    branch,
    district,
    gender,
    mobileNumber,
    additionalMembers,
    foodType,
    numberOfMales,
    numberOfFemales,
    arrivingDate,
    additionalInfo
   
  });
  await alumni.save();

  
});


app.get('/statistics', async (req, res) => {
  try {
    const batchAggregation = await Alumni.aggregate([
      {
        $group: {
          _id: "$batch",
          count: { $sum: 1 },
          males: { $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] } },
          females: { $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] } },
          additionalMembers: { $sum: "$additionalMembers" },
          totalMales: { $sum: "$numberOfMales" },
          totalFemales: { $sum: "$numberOfFemales" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json(batchAggregation);
  } catch (error) {
    console.error('Error aggregating alumni data:', error);
    res.status(500).send('Aggregation failed');
  }
});



app.put('/api/usersupdate/:email', async (req, res) => {
  const { email } = req.params;
  const { currentPassword, newPassword, ...updatedData } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If currentPassword and newPassword are provided, update the password
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(newPassword, salt);
    }

    // Update user details with the updatedData object
    Object.assign(user, updatedData);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/meetings/:id/respond', async (req, res) => {
  const meetingId = req.params.id;
  const userEmail = req.body.email; // Assuming the user's email is sent in the request body

  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    if (meeting.respondedUsers.includes(userEmail)) {
      return res.status(400).json({ message: 'User has already responded' });
    }

    meeting.responses += 1;
    meeting.respondedUsers.push(userEmail);
    await meeting.save();

    res.status(200).json({ message: 'Response submitted successfully', meeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/messages/:id/respond',async (req, res) => {
  const messageId = req.params.id;
  const userEmail = req.body.email; // Assuming userId (email) is stored in session

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.respondedUsers.includes(userEmail)) {
      return res.status(400).json({ message: 'User has already responded' });
    }

    message.responses += 1;
    message.respondedUsers.push(userEmail);
    await message.save();

    res.status(200).json({ message: 'Response submitted successfully', message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.delete("/meetings/:meetingId", async (req, res) => {
  const { meetingId } = req.params;

  try {
    // Find the meeting by meetingId and delete it
    const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!deletedMeeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ error: "Failed to delete meeting" });
  }
});



let otpStorage = {}; // For simplicity, storing OTPs in memory. Use a database in production.


// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).send('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStorage[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    };

   await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error sending OTP');
      }
      res.status(200).send('OTP sent');
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/api/verify-otp', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStorage[email] === otp) {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).send('User not found');
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword; // Update the user's password with the hashed password
      await user.save();
      
      delete otpStorage[email]; // OTP is valid, remove it from storage

      res.status(200).send('Password reset successful');
    } catch (error) {
      res.status(500).send('Server error');
    }
  } else {
    res.status(400).send('Invalid OTP');
  }
});


app.post('/api/uploadachievement', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newAchievement = new Achievement({ imageUrl });
    await newAchievement.save();

    res.status(201).json({ success: true, message: 'Upload successful', imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Upload unsuccessful' });
  }
});



app.get('/achievements', async (req, res) => {
  try {
    const achievements = await Achievement.find()
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Error fetching achievements' });
  }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
