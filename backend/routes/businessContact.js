const express = require("express");
const router = express.Router();
const Contact = require("../models/businessContact");

router.post("/create-list", (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  contact
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Contact created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/contact-list", (req, res, next) => {
  Contact.find().then((doc) => {
    res.status(200).json({
      message: "Business Contact List fetched successfully!",
      businessContact: doc,
    });
  });
});

router.get("/contact-list/:id", (req, res, next) => {
  Contact.findById(req.params.id).then((contact) => {
    if (Contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "err" });
    }
  });
});

router.put("/contact-list/:id", (req, res, next) => {
  const contact = new Contact({
    _id: req.body._id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  Contact.updateOne({ _id: req.params.id }, contact).then((result) => {
    res.status(200).json({
      result,
    });
  });
});

router.delete("/contact-list/:id", (req, res, next) => {
  Contact.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Contact deleted",
    });
  });
});

module.exports = router;
