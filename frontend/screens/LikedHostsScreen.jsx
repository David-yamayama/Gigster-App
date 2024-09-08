import React, { useState } from "react";
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

import AnnounceCardSearch from "../components/AnnounceCardSearch";
import TopCard from "../components/TopCard";

import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addLikedHost, removeLikedHosts } from "../reducers/user";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDisplay, setModalDisplay] = useState(0);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const cardsLiked = useSelector((state) => state.user.value.likedHosts);
  console.log(cardsLiked);

  const [modalContent, setModalContent] = useState({
    image: "",
    title: "",
    location: "",
    availability: "",
    note: "",
  });

  const cardListLiked = cardsLiked.map((data, i) => {
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

  function handleLike(card) {
    if (!cardsLiked.some((e) => e.title === card.title)) {
      dispatch(addLikedHost(card));
    } else {
      dispatch(removeLikedHosts(card));
    }
  }

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
      {modalDisplay === 2 && modalCardContent}

      <ScrollView style={styles.recoZoneSearching}>
        <View style={styles.searchTitle}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Liked Hosts :{" "}
          </Text>
          <FontAwesome
            name="close"
            size={30}
            onPress={() => {
              navigation.navigate("TabNavigator", { screen: "Home" });
            }}
          />
        </View>
        {cardListLiked}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5100FF",
    height: "100%",
  },
  recoZoneSearching: {
    width: "100%",
    marginLeft: "2%",
    marginTop: "20%",
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
