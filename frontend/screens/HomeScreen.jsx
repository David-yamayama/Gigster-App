import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Button,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

import AnnounceCard from "../components/AnnounceCard";
import AnnounceCardSearch from "../components/AnnounceCardSearch";
import TopCard from "../components/TopCard";

import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addLikedHost, removeLikedHosts } from "../reducers/user";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDisplay, setModalDisplay] = useState(0);
  const [styleLike, setStyleLike] = useState({});
  const [searching, setSearching] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cardsLiked = useSelector((state) => state.user.value.likedHosts);
  console.log(cardsLiked);
  
  const [modalContent, setModalContent] = useState({
    image: "",
    title: "",
    location: "",
    availability: "",
    note: "",
  });

  const cardsData = [
    {
      image: require("../assets/Card1.png"),
      title: "L'auberge du chat perché",
      location: "Bordeaux",
      availability: "06 Juin - 17 Juin",
      note: "4.5",
    },
    {
      image: require("../assets/Card2.png"),
      title: `Skyline Bar`,
      location: "Paris La Défense",
      availability: "27 Mai - 02 Juin",
      note: "4.9",
    },
    {
      image: require("../assets/Card3.png"),
      title: "Chez George & Patricia",
      location: "Woippy",
      availability: "25 Mai - 13 Juillet",
      note: "3.4",
    },
    {
      image: require("../assets/Card4.png"),
      title: "Darwin",
      location: "Bordeaux",
      availability: "25 Mai - 31 Mai",
      note: "4.2",
    },
    {
      image: require("../assets/Card5.png"),
      title: "Long Story",
      location: "Versailles",
      availability: "24 Juillet - 23 Janvier",
      note: "5.0",
    },
  ];
  // CARDS SECTION TOP HOST
  const cardList = cardsData.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setModalContent({
            image: data.image,
            title: data.title,
            location: data.location,
            availability: data.availability,
            note: data.note,
          });
          setModalDisplay(2);
          setModalVisible(true);
          
        }}
      >
        <AnnounceCard
          key={i}
          image={data.image}
          title={data.title}
          location={data.location}
          availability={data.availability}
          note={data.note}
        />
      </TouchableOpacity>
    );
  });

  const cardListSearch = cardsData.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          setModalContent({
            image: data.image,
            title: data.title,
            location: data.location,
            availability: data.availability,
            note: data.note,
          });
          setModalDisplay(2);
          setModalVisible(true);
        }}
      >
        <AnnounceCardSearch
          key={i}
          image={data.image}
          title={data.title}
          location={data.location}
          availability={data.availability}
          note={data.note}
        />
      </TouchableOpacity>
    );
  });

  const topData = [
    {
      image: require("../assets/PP1.png"),
      name: "Taylor Swift",
    },
    {
      image: require("../assets/PP2.png"),
      name: "The Weeknd",
    },
    {
      image: require("../assets/PP3.png"),
      name: "Travis Scott",
    },
    {
      image: require("../assets/PP4.png"),
      name: "Owl City",
    },
    {
      image: require("../assets/PP5.png"),
      name: "Jul",
    },
    {
      image: require("../assets/PP6.png"),
      name: "Daft Punk",
    },
    {
      image: require("../assets/PP7.png"),
      name: "PNL",
    },
    {
      image: require("../assets/PP8.png"),
      name: "Blackpink",
    },
    {
      image: require("../assets/PP9.png"),
      name: "Mylène Farmer",
    },
    {
      image: require("../assets/PP10.png"),
      name: "Franky Vincent",
    },
  ];

  const topList = topData.map((data, i) => {
    return <TopCard key={i} image={data.image} name={data.name} />;
  });

  function navigateModal() {
    navigation.navigate("TabNavigator", { screen: "Profile" });
    setModalVisible(!modalVisible);
  }

  function navigateLikedHosts() {
    navigation.navigate("LikedHostsScreen");
    setModalVisible(!modalVisible);
  }

  function logout() {
    navigation.navigate("LoginScreen");
  }

  function handleLike(card) {
    if (!cardsLiked.some((e) => e.title === card.title)) {
      dispatch(addLikedHost(card));
    } else {
      dispatch(removeLikedHosts(card));
    }
  }

  const modalUserContent = (
    <Modal
      style={styles.modal}
      isVisible={modalVisible}
      swipeDirection="left"
      animationInTiming={500}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      hideModalContentWhileAnimating={true}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onBackdropPress={() => {
        setModalDisplay(0);
        setModalVisible(false);
      }}
      onSwipeComplete={() => {
        setModalDisplay(0);
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View>
          <View style={styles.modalView}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profilePic}
                source={{uri: user.profilePicture}}
              />
              <Text style={styles.profileText}>{user.username}</Text>
            </View>
            <FontAwesome
              name="times"
              onPress={() => {
                setModalDisplay(0);
                setModalVisible(false);
              }}
              size={40}
            />
          </View>
          <View style={styles.modalNav}>
            <TouchableOpacity onPress={() => navigateModal()}>
              <View style={styles.modalSection}>
                <FontAwesome name="user" size={25} style={styles.iconModal} />
                <View style={styles.modalAlign}>
                  <Text style={styles.modalText}>Profile</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.modalSection}>
              <FontAwesome
                name={user.isArtist ? "globe" : "music"}
                size={25}
                style={styles.iconModal}
              />
              <View style={styles.modalAlign}>
                <Text style={styles.modalText}>
                  {user.isArtist ? "My tours" : "My bookings"}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigateLikedHosts()}>
              <View style={styles.modalSection}>
                <FontAwesome name="heart" size={25} style={styles.iconModal} />
                <View style={styles.modalAlign}>
                  <Text style={styles.modalText}>
                    {user.isArtist ? "Liked hosts" : "Liked artists"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.modalSection}>
              <FontAwesome name="gear" size={25} style={styles.iconModal} />
              <View style={styles.modalAlign}>
                <Text style={styles.modalText}>Settings</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => logout()}>
              <View style={styles.lastModalSection}>
                <FontAwesome
                  name="close"
                  size={25}
                  style={styles.iconLastModal}
                />
                <View style={styles.modalAlign}>
                  <Text style={styles.modalLastText}>Log out</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const modalCardContent = (
    <Modal
      isVisible={modalVisible}
      swipeDirection="down"
      animationInTiming={500}
      animationIn="slideInUp"
      animationOut="slideOutUp"
      hideModalContentWhileAnimating={true}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onBackdropPress={() => {
        setModalDisplay(0);
        setModalVisible(false);
      }}
      onSwipeComplete={() => {
        setModalDisplay(0);
        setModalVisible(false);
      }}
    >
      <View style={styles.cardCenteredView}>
        <Image style={styles.firstImage} source={modalContent.image}></Image>
        <View style={styles.cardModalDesc}>
          <View style={styles.titleModalDesc}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {modalContent.title}
            </Text>
          </View>
          <View style={styles.iconDesc}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <FontAwesome name="star" size={40} color={"#d4a60f"} />
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {modalContent.note}
              </Text>
            </View>
            <FontAwesome
              name="heart"
              size={35}
              onPress={() => handleLike(modalContent)}
              style={
                cardsLiked.some((e) => e.title === modalContent.title) && {
                  color: "red",
                }
              }
            />
          </View>
          <View style={styles.infoDesc}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {modalContent.location}
            </Text>
            <View style={styles.modalAvailability}>
              <Text>Dates of availability</Text>
              <Text style={{ fontWeight: "bold" }}>
                {modalContent.availability}
              </Text>
            </View>
            <Text style={styles.bioDesc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              provident praesentium quasi impedit explicabo odio! Nam provident,
              perspiciatis saepe, suscipit voluptas deserunt minima quia, nisi
              et repellat qui a dolorum. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Delectus, atque iusto dicta odio maxime
              veritatis. Voluptatibus ex repudiandae cumque consequatur minus
              dolore fuga, facere eveniet nemo illum animi, beatae repellendus.
              Lorem
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {modalDisplay === 1 && modalUserContent}
      {modalDisplay === 2 && modalCardContent}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnModal}
          onPress={() => {
            setModalDisplay(1);
            setModalVisible(true);
          }}
        >
          <Image
            style={styles.profilePicMenu}
            source={{uri: user.profilePicture}}
          />
        </TouchableOpacity>
        <View style={styles.searchField}>
          <TextInput
            placeholder={
              user.isArtist
                ? "Find your future hosts"
                : "Find your future artists"
            }
            placeholderTextColor="black"
            style={styles.input}
            
          ></TextInput>
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => setSearching(true)}
          >
            <Text style={styles.textSearch}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!searching ? (
        <View>
          <Text style={styles.welcome}>Welcome {user.username}</Text>
          <Text style={styles.discover}>Discover...</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.recoZone}
          >
            {cardList}
          </ScrollView>
          <Text style={styles.titleRanking}>Top Artist</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.topZone}
          >
            {topList}
          </ScrollView>
        </View>
      ) : (
        <ScrollView style={styles.recoZoneSearching}>
          <View style={styles.searchTitle}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Results for Bordeaux :{" "}
            </Text>
            <FontAwesome
              name="close"
              size={30}
              onPress={() => setSearching(false)}
            />
          </View>
          {cardListSearch}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: "#F3F4EB",
    height: "100%",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    paddingTop: 20,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    height: "40%",
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    // Pour Android
    elevation: 5,
    // Pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  input: {
    width: "70%",
  },
  btnSearch: {
    height: "80%",
    backgroundColor: "#5100FF",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    // Pour Android
    elevation: 5,
    // Pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  textSearch: {
    color: "white",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 25,
    marginBottom: 10,
    height: "5%",
  },
  discover: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    height: "3%",
  },
  titleRanking: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 25,
    height: "6%",
  },
  recoZone: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
  },
  recoZoneSearching: {
    width: "100%",
    height: "80%",
    marginLeft: "2%",
  },
  topZone: {
    width: "100%",
    height: "23%",
    flexDirection: "row",
  },
  btnModal: {
    width: "20%",
    marginRight: 10,
  },
  modal: {
    marginTop: "15%",
    marginBottom: "10%",
    width: "75%",
    borderWidth: 3,
    borderRadius: 13,
  },
  centeredView: {
    backgroundColor: "#F3F4EB",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  cardCenteredView: {
    backgroundColor: "#E6E6E6",
    width: "100%",
    height: "95%",
    justifyContent: "space-between",
    borderRadius: 15,
    borderWidth: 6,
    overflow: "hidden",
  },
  modalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    marginTop: "15%",
    backgroundColor: "#5100FF",
    width: "90%",
    height: 100,
    borderRadius: 100,
    // Pour Android
    elevation: 5,
    // Pour iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    margin: 15,
  },
  profileText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
  profilePicMenu: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "black",
  },
  modalNav: {
    alignItems: "center",
    marginTop: 20,
  },
  modalSection: {
    flexDirection: "row",
    width: "90%",
    margin: 10,
    height: 60,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 107,
    paddingLeft: 30,
  },
  lastModalSection: {
    flexDirection: "row",
    width: "90%",
    height: 60,
    borderWidth: 2,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 107,
    borderColor: "red",
    backgroundColor: "red",
    paddingLeft: 30,
  },
  iconModal: {
    width: "15%",
    textAlign: "center",
  },
  iconLastModal: {
    width: "15%",
    textAlign: "center",
    color: "white",
  },
  modalText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalLastText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
  modalAlign: {
    width: "80%",
  },
  searchTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "12%",
  },
  firstImage: {
    height: "25%",
    objectFit: "cover",
    width: "100%",
  },
  cardModalDesc: {
    height: "75%",
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderTopWidth: 3,
  },
  infoDesc: {
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  bioDesc: {
    height: "60%",
    textAlign: "justify",
    overflow: "hidden",
  },
  modalAvailability: {
    alignItems: "center",
  },
  iconDesc: {
    height: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleModalDesc: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  belowNavbar: {
    height: "10%",
    backgroundColor: "green",
  },
});
