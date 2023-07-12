const express = require("express");
const router = express.Router();
const User = require("../models/user");

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

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }
      res.status(200).json({ token: "successfully login" });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

module.exports = router;
