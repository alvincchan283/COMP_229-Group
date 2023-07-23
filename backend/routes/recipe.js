const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const authMiddleware = require('../middleware/auth.middleware');

router.post("/create-list", authMiddleware, (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
  });
  recipe
    .save()
    .then((result) => {
      res.status(201).json({
        message: "recipe created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/recipe-list", (req, res, next) => {
  Recipe.find().then((doc) => {
    res.status(200).json({
      message: "Recipe List fetched successfully!",
      recipes: doc,
    });
  });
});

router.get("/recipe-list/:id", (req, res, next) => {
  Recipe.findById(req.params.id).then((recipe) => {
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "err" });
    }
  });
});

router.put("/recipe-list/:id", authMiddleware, (req, res, next) => {
  const recipe = new Recipe({
    _id: req.body._id,
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
  });
  Recipe.updateOne({ _id: req.params.id }, recipe).then((result) => {
    res.status(200).json({
      result,
    });
  }).catch(err => {
    console.error(err);
    res.status(404).json({ message: 'The recipe could not be found.' });
  });
});

router.delete("/recipe-list/:id", authMiddleware, (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "recipe deleted",
    });
  }).catch(err => {
    console.error(err);
    res.status(404).json({ message: 'The recipe could not be found.' });
  });
});

module.exports = router;
