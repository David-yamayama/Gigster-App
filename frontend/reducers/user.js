import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: null,
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    address: {
      street: null,
      city: null,
      zipcode: null,
    },
    phoneNumber: null,
    birthdate: null,
    artist: {
      artistname: null,
      members: 0,
      placeOrigin: null,
      genres: [],
    },
    host: {
      description: null,
      favoritesGenres: [],
    },
    isArtist: false,
    isHost: false,
    medias: [],
    token: null,
    likedHosts: []
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateId: (state, action) => {
      state.value._id = action.payload;
    },
    updateUsername: (state, action) => {
      state.value.username = action.payload;
    },
    updateEmail: (state, action) => {
      state.value.email = action.payload;
    },
    updateFirstname: (state, action) => {
      state.value.firstname = action.payload;
    },
    updateLastname: (state, action) => {
      state.value.lastname = action.payload;
    },
    updateAddress: (state, action) => {
      state.value.address = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.value.phoneNumber = action.payload;
    },
    getArtistInfos: (state, action) => {
      state.value.artist = { ...state.value.artist, ...action.payload };
    },
    getHostInfos: (state, action) => {
      state.value.host = action.payload;
    },
    updateBirthdate: (state, action) => {
      state.value.birthdate = action.payload;
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
    updateArtist: (state, action) => {
      state.value.isArtist = action.payload;
    },
    updateHost: (state, action) => {
      state.value.isHost = action.payload;
    },
    addMedia: (state, action) => {
      state.value.medias.push(action.payload);
    },
    removeMedia: (state, action) => {
      state.value.medias = state.value.medias.filter(
        (e) => e !== action.payload
      );
    },
    addLikedHost: (state, action) => {
      state.value.likedHosts.push(action.payload);
    },
    removeLikedHosts: (state, action) => {
      state.value.likedHosts = state.value.likedHosts.filter(
        (e) => e.title !== action.payload.title
      );
    },
  },
});

export const {
  updateId,
  updateUsername,
  updateEmail,
  updateFirstname,
  updateLastname,
  updateBirthdate,
  updateAddress,
  updateToken,
  updateArtist,
  updateHost,
  updatePhoneNumber,
  addMedia,
  removeMedia,
  getArtistInfos,
  getHostInfos,
  addLikedHost,
  removeLikedHosts
} = userSlice.actions;
export default userSlice.reducer;
