const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

process.env.JWT_KEY =
  process.env.JWT_KEY ?? crypto.randomBytes(128).toString("hex");

//User register
router.post("/register", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//User login
router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      const token = jwt.sign(
        {
          username: user.username,
          _id: user._id,
        },
        process.env.JWT_KEY
      );
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

// Get user information
router.get("/user", (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Find the user by ID
    User.findById(decoded._id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found!" });
        }

        // Respond with the user's username and email
        res.status(200).json({
          username: user.username,
          email: user.email,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

// Update user information
router.put("/user", (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Find and update the user by ID
    User.findByIdAndUpdate(decoded._id, {
      username: req.body.username,
      password: req.body.password, // Consider hashing the password
      email: req.body.email,
    })
      .then(() => {
        res.status(200).json({ message: "User updated successfully!" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

module.exports = router;
