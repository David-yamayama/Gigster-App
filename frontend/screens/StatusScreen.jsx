import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";

export default function StatusScreen(props) {
  function handleArtist() {
    const newStatus = {
      isArtist: true,
      isHost: false,
    };
    props.updateUser(newStatus);
  }

  function handleHost() {
    const newStatus = {
      isArtist: false,
      isHost: true,
    };
    props.updateUser(newStatus);
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>I am an...</Text>
        <TouchableOpacity
          style={styles.statusBtn}
          onPress={() => handleArtist()}
        >
          <Text style={styles.text_button}>ARTIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusBtn} onPress={() => handleHost()}>
          <Text style={styles.text_button}>HOST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F4EB",
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    marginTop: "40%",
    color: "#black",
  },
  statusBtn: {
    height: 100,
    width: "70%",
    paddingTop: 10,
    marginTop: "20%",
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
  text_button: {
    backgroundColor: "#5100FF",
    height: 100,
    color: "#FFFFFF",
    fontSize: 20,
    paddingBottom: 20,
    paddingTop: 35,
    textAlign: "center",
    borderRadius: 13,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    overflow: "hidden",
  },
});
