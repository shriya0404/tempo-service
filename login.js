const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the current directory

// MongoDB connection
mongoose.connect(
  'mongodb+srv://oswin:oswinalex@cluster0.7mnzpn3.mongodb.net/?retryWrites=true&w=majority&dbname=newtest',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define your schema and model (same as in your code)
const custSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const cust = mongoose.model('cust', custSchema);

// Serve the login form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Handle login query
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search for a customer with the provided email and password
    const customer = await cust.findOne({ email, password });

    if (customer) {
      // Successful login
      res.send('Login successful!');
    } else {
      // Invalid credentials
      res.send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
