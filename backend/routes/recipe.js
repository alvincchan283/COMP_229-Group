const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const authMiddleware = require("../middleware/auth.middleware");

//Recipe create
router.post("/create-list", authMiddleware, (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    desc: req.body.desc,
    img: req.body.img,
    date: req.body.date,
    ingredients: req.body.ingredients,
    tips: req.body.tips,
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

//Get all Recipe list
router.get("/recipe-list", (req, res, next) => {
  Recipe.find().then((doc) => {
    res.status(200).json({
      message: "Recipe List fetched successfully!",
      recipes: doc,
    });
  });
});

//Get single Recipe
router.get("/recipe-list/:id", (req, res, next) => {
  Recipe.findById(req.params.id).then((recipe) => {
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "err" });
    }
  });
});

//Search for recipe using keyword
router.get("/search", (req, res, next) => {
  const searchQuery = {};
  for (let key of ['name', 'ingredients', 'cuisine', 'prepareTime']) {
    if (req.query[key]) {
      searchQuery[key] = key === 'prepareTime' ? req.query[key] : { $regex: req.query[key], $options: 'i'};
    }
  }

  Recipe.find(searchQuery).then(recipes => {
    res.status(200).json(recipes);
  })
});

//Update single Recipe
router.put("/recipe-list/:id", authMiddleware, (req, res, next) => {
  const { name, desc, img, ingredients, tips } = req.body;
  Recipe.updateOne(
    { _id: req.params.id },
    { name, desc, img, ingredients, tips }
  )
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: "The recipe could not be found." });
    });
});

//Delete single Recipe
router.delete("/recipe-list/:id", authMiddleware, (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "recipe deleted",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: "The recipe could not be found." });
    });
});

module.exports = router;
