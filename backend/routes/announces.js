const express = require("express");
const router = express.Router();
const { checkBody } = require("../modules/checkBody");
const authMiddleware = require("../middleware/auth");
const { Announce } = require("../models/announces");
const { User } = require("../models/users");

router.post("/announces", authMiddleware, (req, res) => {
  const requiredFields = [
    "address",
    "instrumentsAvailable",
    "locationType",
    "capacity",
    "description",
    "availableDates",

  ];
  if (!checkBody(req.body, requiredFields)) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  console.log(req.body);
  const username = req.auth.username;

  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    const newAnnounce = new Announce({
      host: user._id,
      address: req.body.address,
      availableDates: req.body.availableDates,
      locationType: req.body.locationType,
      instrumentsAvailable: req.body.instrumentsAvailable,
      capacity: req.body.capacity,
      description: req.body.description,
      medias: req.body.medias,
      accessibility: req.body.accessibility,
      accomodation: req.body.accomodation,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    newAnnounce
      .save()
      .then(() => {
        res.json({ result: true, newAnnounce });
      })
      .catch((error) => {
        res.json({
          result: false,
          error,
        });
      });
  });
});

router.get("/allAnnounces", (req, res) => {
  Announce.find()
    .populate("host")
    .then((announces) => {
      res.json({ result: true, announces });
    });
});

module.exports = router;
