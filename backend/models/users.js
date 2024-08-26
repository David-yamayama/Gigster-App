const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: String,
});

const hostSchema = mongoose.Schema({
  hostRanking: { type: Number, default: 5 },
  description: String,
  announces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announce" }],
  favoritesGenres: { type: [String], required: false },
  hostedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const artistSchema = mongoose.Schema({
  artistname: { type: String, required: false },
  genres: { type: [String], required: false },
  members: { type: Number, default: 1 },
  //medias: [String],
  description: String,
  placeOrigin: String,
  tours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
  artistRanking: { type: Number, default: 5 },
});

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  addresses: { type: [addressSchema], required: true },
  isArtist: { type: Boolean, default: false },
  isHost: { type: Boolean, default: false },
  artist: { type: artistSchema, required: false },
  host: { type: hostSchema, required: false },
  //image: [String],
  phoneNumber: String,
  birthdate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profilePicture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
