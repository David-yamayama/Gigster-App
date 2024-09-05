import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

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
    likedHosts: [],
    profilePicture: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { key, value } = action.payload;
      if (key === "birthdate") {
        state.value[key] = moment(value).format("DD/MM/YYYY");
      } else {
        state.value[key] = value;
      }
    },

    updateUserAtLog: (state, action) => {
      const newData = action.payload;

      if (newData.birthdate) {
        newData.birthdate = moment(newData.birthdate).format("DD/MM/YYYY");
      }

      state.value = { ...state.value, ...newData };
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
  updateUser,
  updateUserAtLog,
  addMedia,
  removeMedia,
  addLikedHost,
  removeLikedHosts,
} = userSlice.actions;
export default userSlice.reducer;
