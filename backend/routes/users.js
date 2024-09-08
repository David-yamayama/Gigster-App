var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const authMiddleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const { User } = require("../models/users");

router.post("/signup", (req, res) => {
  console.log("Sign-up Request Body:", req.body);
  if (
    !checkBody(req.body, [
      "username",
      "password",
      "email",
      "firstname",
      "lastname",
      "birthdate",
      "phoneNumber",
    ])
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then((user) => {
    if (user === null) {
      const payload = {
        username: req.body.username,
      };

      const options = {
        expiresIn: "30m",
        algorithm: "HS256",
      };
      console.log("BODY", req.body);
      const hash = bcrypt.hashSync(req.body.password, 10);
      const token = jwt.sign(payload, secretKey, options);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        phoneNumber: req.body.phoneNumber,
        isArtist: req.body.isArtist,
        isHost: req.body.isHost,
        token,
        addresses: [req.body.addresses],
        artist: req.body.artist,
        host: req.body.host,
        profilePicture: req.body.profilePicture,
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token, data: newDoc });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  console.log("Sign-in Request Body:", req.body);
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      const payload = { username: data.username };
      const options = { expiresIn: "30m", algorithm: "HS256" };
      const newToken = jwt.sign(payload, secretKey, options);

      data.token = newToken;
      data.save().then(() => {
        res.json({ result: true, data });
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.post("/refresh", authMiddleware, (req, res) => {
  const username = req.auth.username;

  const payload = { username };
  const options = { expiresIn: "1s", algorithm: "HS256" };
  const newToken = jwt.sign(payload, secretKey, options);

  User.findOne({ username })
    .then((user) => {
      if (user) {
        user.token = newToken;
        user
          .save()
          .then(() => {
            return res.status(200).json({ result: true, token: newToken });
          })
          .catch((error) => {
            console.error(error);
            return res
              .status(500)
              .json({ result: false, error: "Failed to save token" });
          });
      } else {
        return res.status(404).json({ result: false, error: "User not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ result: false, error: "Database error" });
    });
});

module.exports = router;
