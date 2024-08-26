import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function TopCard(props) {
  return (
    <View style={styles.topCard}>
      <View style={styles.topImage}>
        <Image style={styles.topImg} source={props.image} />
      </View>
      <View style={styles.topDesc}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topCard: {
    width: 150,
    height: "80%",
    backgroundColor: "white",
    margin: 10,
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
  topImage: {
    width: "100%",
    height: "80%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
  },
  topImg: {
    width: "100%",
    height: "100%",
    borderTopEndRadius: 17,
    borderTopStartRadius: 17,
  },
  topDesc: {
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopCard;
