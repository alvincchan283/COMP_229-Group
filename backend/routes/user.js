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

module.exports = router;
