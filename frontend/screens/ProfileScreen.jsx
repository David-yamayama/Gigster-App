import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import profilePic from "../assets/Shulk.png";

import { useDispatch, useSelector } from "react-redux";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfileScreen() {
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.user.value);

  console.log(user.isArtist);

  const galleryData = [
    require("../assets/Gallery1.png"),
    require("../assets/Gallery2.png"),
    require("../assets/Gallery3.png"),
    require("../assets/Gallery4.png"),
    require("../assets/Gallery5.png"),
    require("../assets/Gallery6.png"),
    require("../assets/Gallery7.png"),
    require("../assets/Gallery8.png"),
    require("../assets/Gallery9.png"),
  ];

  let smallGalleryData = [];

  console.log(smallGalleryData);

  if (galleryData.length < 9) {
    smallGalleryData = [...galleryData];

    for (let i = 1; i <= 9 - galleryData.length; i++) {
      smallGalleryData.push(`void ${i}`);
    }
  }

  console.log(smallGalleryData);

  const galleryList = galleryData.map((data, i) => {
    return <Image key={i} source={data} style={styles.media} />;
  });

  const smallGalleryList = smallGalleryData.map((data, i) => {
    return <Image key={i} source={data} style={styles.media} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileCard}>
          <ImageBackground source={profilePic} style={styles.profilePic}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,1)"]}
              style={styles.background}
            />
            <View style={styles.profileDesc}>
              <View style={styles.infosContainer}>
                <Text style={styles.username}>
                  {user.isArtist ? user.artist.artistname : user.username}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.infosZone}>
        <View style={styles.descCard}>
          <ScrollView>
            <Text style={styles.description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              consectetur blanditiis repudiandae, minima inventore recusandae
              facere vitae aspernatur fugiat veniam, quo velit explicabo amet
              architecto quas id molestiae quia. Reiciendis! Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Unde enim dicta sit ipsam,
              aliquam magni aut, voluptates possimus tempora harum, laborum iste
              sequi voluptatem. Iure magnam reiciendis autem natus excepturi.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              magnam ab quaerat nostrum ad. Explicabo eos nostrum repellendus
              dolores magnam fugit asperiores maiores cupiditate sunt unde!
              Ipsam aliquid deserunt laborum.
            </Text>
          </ScrollView>
        </View>
        <View style={styles.infosCardsContainer}>
          <View style={styles.infosCard}>
            <View style={styles.cardHead}>
              <Text style={styles.cardTitle}>Medias</Text>
              <FontAwesome name="camera" size={25} />
            </View>
            <View style={styles.mediaCard}>
              {galleryData.length >= 9 ? galleryList : smallGalleryList}
            </View>
          </View>
          <View style={styles.infosCard}>
            <View style={styles.cardHead}>
              <Text style={styles.cardTitle}>Information</Text>
              <FontAwesome name="info" size={25} />
            </View>
            <View style={styles.cardBottom}>
              <View style={styles.infoSection}>
                <Text>Genres: </Text>
                <Text style={{ fontWeight: "bold" }}>Electro - Rock - Rap</Text>
              </View>
              <View style={styles.infoSection}>
                <Text>Instruments :</Text>
                <Text style={{ fontWeight: "bold" }}>
                  Piano - Batterie - Table de Mixage
                </Text>
              </View>
              <View style={styles.btnSection}>
                <TouchableOpacity style={styles.btnRecap}>
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Date Recap
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.spotifyContainer}>
        <View style={styles.spotifyCard}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Link to</Text>
          <Image
            style={styles.logoSpotify}
            source={require("../assets/LogoSpotify.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0E7F6",
    height: "89%",
  },
  profileContainer: {
    width: "100%",
    height: "35%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileCard: {
    width: "95%",
    height: "80%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
  },

  profilePic:{
width:"100%",
height:"100%",
resizeMode:"cover",
borderRadius: 20,
overflow:"hidden"


  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  profileDesc: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: "2%",
  },
  username: {
    fontWeight: "bold",
    fontSize: 25,
  },
  infosContainer: {
    alignItems: "center",
  },
  infosZone: {
    height: "57%",
    alignItems: "center",
    paddingTop: "2%",
  },
  descCard: {
    width: "95%",
    height: "49%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "justify",
  },
  infosCardsContainer: {
    width: "95%",
    height: "51%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
  },
  infosCard: {
    width: "49%",
    height: "100%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
  },
  cardHead: {
    backgroundColor: "#99818d",
    flexDirection: "row",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
    width: "101%",
  },
  cardBottom: {
    height: "80%",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  mediaCard: {
    height: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  media: {
    width: "29%",
    height: "29%",
    objectFit: "cover",
    marginTop: "3%",
    borderRadius: 5,
  },
  infoSection: {
    width: "90%",
    marginLeft: "5%",
    height: "35%",
    marginTop: "2%",
  },
  btnSection: {
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnRecap: {
    width: "60%",
    height: "70%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#5100FF",
  },
  spotifyContainer: {
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
  },
  spotifyCard: {
    width: "95%",
    height: "95%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 30,
  },
  logoSpotify: {
    height: "90%",
    width: "40%",
  },
});
