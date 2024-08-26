const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const showSchema = mongoose.Schema({
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "tours" },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  address: { type: addressSchema, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, default: "Brouillon" },
  isValidated: { type: Boolean, default: false },
  isRefused: { type: Boolean, default: false },
});

const ShowsAdress = mongoose.model("showsAdress", addressSchema);
const Show = mongoose.model("shows", showSchema);

module.exports = { ShowsAdress, Show };
