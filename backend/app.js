const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");

//Routes
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");

//Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://winco1125:smRNsYM5AhYDMlVj@cluster0.dmsaq4j.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected ");
  })
  .catch(() => {
    console.log("error");
  });

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static("./dist/Comp229-group-project"));

app.use("/api", userRouter);
app.use("/api/recipe", recipeRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, Content-Type, Accept, Authorization,X-Api-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );

  next();
});

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/Comp229-group-project/" })
);

module.exports = app;
