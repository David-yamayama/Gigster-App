const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const availableDateSchema = mongoose.Schema({
  startDateAt: {
    type: Date,
    required: true,
  },
  endDateAt: {
    type: Date,
    required: true,
  },
});

const accomodationSchema = mongoose.Schema({
  sleeping: {
    type: Boolean,
    default: false,
  },
  restauration: {
    type: Boolean,
    default: false,
  },
});

const announceSchema = mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Corrigé ici pour référencer 'User'
  address: { type: [addressSchema], required: true },
  availableDates: { type: [availableDateSchema], required: true },
  locationType: { type: [String], required: true },
  instrumentsAvailable: [String],
  capacity: { type: Number, default: 10 },
  description: String,
  accessibility: {
    type: Boolean,
    default: false,
  },
  medias: { type: [String], default: [] },
  placeRanking: { type: Number, default: 5 },
  accomodation: { type: accomodationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Announce = mongoose.model("Announce", announceSchema);

module.exports = { Announce };
