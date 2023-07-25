const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    tokenUser = jwt.verify(token, process.env.JWT_KEY);

    if (!tokenUser)
      return res.status(401).send({ message: "Token expired or invalid." });
  } catch (ex) {
    return res.status(401).send({ message: "Token expired or invalid." });
  }

  User.findById(tokenUser._id)
    .then((user) => {
      if (!user)
        return res.status(401).send({ message: "Token expired or invalid." });
      next();
    })
    .catch((err) =>
      res.status(500).send({ message: "Error occurred during authorization. " })
    );
};
