const express = require("express");

const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/user");
const businessContactRouter = require("./routes/businessContact");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://winco1125:JdrSJ0hNhtHp1i3e@cluster0.dmsaq4j.mongodb.net/",
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

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static("./dist/COMP229_Assignment2"));
app.use(cors());
app.use("/api", userRouter);
app.use("/api/business", businessContactRouter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, Content-Type, Accept, authorization,X-Api-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );

  next();
});

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/COMP229_Assignment2/" })
);

module.exports = app;
