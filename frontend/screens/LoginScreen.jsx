import Login from "../components/Login";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import React, { useState } from "react";
import { FRONT_IP } from "../hide-ip";
import StatusScreen from "./StatusScreen";
import {
  updateToken,
  updateId,
  updateUsername,
  updateEmail,
  updateFirstname,
  updateLastname,
  updateAddress,
  updatePhoneNumber,
  getArtistInfos,
  getHostInfos,
  updateBirthdate,
  updateArtist,
  updateHost,
} from "../reducers/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    _id: null,
    username: null,
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    address: {
      street: null,
      city: null,
      zipcode: null,
    },
    phoneNumber: null,
    birthdate: new Date(),
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
  });

  function getNextPage(numPage) {
    setCurrentPage(numPage);
  }

  function updateUser(data) {
    setUser((previousUser) => {
      const updatedUser = { ...previousUser };

      Object.keys(data).forEach((key) => {
        if (key === "birthdate") {
          updatedUser[key] = new Date(data[key]);
          return;
        }

        if (typeof data[key] === "object" && !Array.isArray(data[key])) {
          updatedUser[key] = {
            ...previousUser[key],
            ...data[key],
          };
        } else {
          updatedUser[key] = data[key];
        }
      });

      if (currentPage !== 4) {
        setCurrentPage(currentPage + 1);
      }
      return updatedUser;
    });
  }
  // Mécanique permettant de send les data après le re-render
  if (currentPage === 5) {
    sendData();
  }

  console.log("Utilisateur Final:", user);
  async function sendData() {
    console.log("Envoi des données vers le backend");
    console.log("Utilisateur Final:", user);
    const resp = await fetch(`https://gigsterbackend.vercel.app/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await resp.json();

    console.log(
      "Retour du backend :",
      data,
      "/ token:",
      data.token,
      "/ ID:",
      data.data._id,
      "/ error message:",
      data.error
    );
    if (data.result) {
      dispatch(updateId(data.data._id));
      dispatch(updateToken(data.token));
      dispatch(updateUsername(user.username));
      dispatch(updateEmail(user.email));
      dispatch(updateFirstname(user.firstname));
      dispatch(updateLastname(user.lastname));
      dispatch(updateAddress(user.address));
      dispatch(updatePhoneNumber(user.phoneNumber));
      dispatch(getArtistInfos(user.artist));
      dispatch(getHostInfos(user.host));
      dispatch(updateBirthdate(moment(user.birthdate).format("DD/MM/YYYY")));
      dispatch(updateArtist(user.isArtist));
      dispatch(updateHost(user.isHost));
      navigation.navigate("TabNavigator", { screen: "Home" });
    }
  }

  return (
    <>
      {currentPage === 1 && (
        <Login getNextPage={getNextPage} updateUser={updateUser} user={user} />
      )}
      {currentPage === 2 && (
        <StatusScreen
          getNextPage={getNextPage}
          updateUser={updateUser}
          user={user}
        />
      )}
      {currentPage === 3 && (
        <Step1 getNextPage={getNextPage} updateUser={updateUser} user={user} />
      )}
      {currentPage === 4 && (
        <Step2
          getNextPage={getNextPage}
          updateUser={updateUser}
          sendData={sendData}
          user={user}
        />
      )}
    </>
  );
}
