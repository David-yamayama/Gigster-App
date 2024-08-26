const express = require("express");
const router = express.Router();
const { checkBody } = require('../modules/checkBody');
const authMiddleware = require('../middleware/auth');
const { User } = require("../models/users")
const { Tour } = require("../models/tours")

router.post("/hostTours", authMiddleware, (req, res) => {
    const requiredFields = ['date', 'city', 'street', 'zipcode', 'status'];
    if (!checkBody(req.body, requiredFields)) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const username = req.auth.username;

    User.findOne({ username }).then(user => {
        if (user) {
            const newShow = new Show({
                host: user._id,
                date: req.body.date,
                address: [{ street: req.body.street, city: req.body.city, zipcode: req.body.zipcode }],
                status: req.body.status,
                isValidated: req.body.isValidated,
                isRefused: req.body.isRefused,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            newShow.save().then(savedShow => {
                const newTour = new Tour({
                    artist: user._id,
                    showsID: [savedShow._id],
                    isValidated: req.body.isValidated,
                    status: req.body.status,
                    setDuration: req.body.setDuration,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                newTour.save().then(() => {
                    res.json({ result: true, newTour });
                });
            });
        } else {
            res.json({ result: false, error: 'User not found' });
        }
    });
});

module.exports = router;

