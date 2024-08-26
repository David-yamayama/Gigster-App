const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  showsID: [{ type: mongoose.Schema.Types.ObjectId, ref: "shows" }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isValidated: { type: Boolean, default: false },
  status: { type: String, default: "Brouillon" },
  setDuration: { type: Number, required: true },
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = { Tour };
