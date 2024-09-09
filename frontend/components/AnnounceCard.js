import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function AnnounceCard(props) {
  return (
    <View style={styles.recoCard}>
      <View style={styles.recoImage}>
        <Image style={styles.recoImg} source={props.image} />
      </View>
      <View style={styles.recoDesc}>
        <View style={styles.descContainer}>
          <Text style={styles.recoTitle}>{props.title}</Text>
          <Text style={styles.recoPlace}>{props.location}</Text>
          <Text style={styles.recoDate}>{props.availability}</Text>
        </View>
        <View style={styles.recoNote}>
          <FontAwesome name="star" size={30} color={"#d4a60f"} />
          <Text style={styles.recoPlace}>{props.note}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recoCard: {
    width: 300,
    height: "90%",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    borderRadius: 20,
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
  recoImage: {
    width: "100%",
    height: "70%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
  },
  recoImg: {
    width: "100%",
    height: "100%",
    borderTopEndRadius: 17,
    borderTopStartRadius: 17,
  },
  recoDesc: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 15,
  },
  descContainer: {
    height: "100%",
    justifyContent: "center",
  },
  recoTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  recoPlace: {
    fontSize: 13,
    fontWeight: "bold",
  },
  recoNote: {
    justifyContent: "center",
    alignItems: "center",
  },
  recoDate: {
    fontSize: 11,
  },
});

export default AnnounceCard;
