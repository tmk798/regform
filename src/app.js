const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./db");
const User = require("./userModel");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Registration Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email already registered.");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send("<h2>Registration Successful!</h2><a href='/login'>Go to Login</a>");

  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Login Route with Marvel Redirect
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials.");
    }

    // Redirect to Marvel carousel page after login
    res.redirect("/marvel.html");

  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
