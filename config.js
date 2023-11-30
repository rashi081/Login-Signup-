const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)

mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON data (included in recent versions of Express)
app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Create a new user
  const newUser = new User({
    username,
    password, // In a production environment, you should hash the password before saving it.
  });

  // Save the user to the database
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registering user');
    } else {
      res.status(200).send('Registration successful');
    }
  });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ username });

  // Check if the user exists and the password is correct
  if (user && user.password === password) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
