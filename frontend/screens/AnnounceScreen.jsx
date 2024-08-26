import React, { useState, useEffect } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";

import * as ImagePicker from "expo-image-picker";
import Slider from "@react-native-community/slider";

import { CalendarList, LocaleConfig } from "react-native-calendars";
import { eachDayOfInterval, format, isBefore } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebase from "../firebaseconfig";

export default function AnnounceScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [items, setItems] = useState([
    { label: "Bar", value: "bar" },
    { label: "Maison", value: "maison" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Appartement", value: "appartement" },
  ]);

  //Variable d'états pour les images
  const [image, setImage] = useState(null)


  // Variable d'état des inputs
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [accessibilityCheckbox, setAccessibilityCheckbox] = useState(false);
  const [accomodation, setAccomodation] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const [sliderValue, setSliderValue] = useState(10);
  const [selectionStart, setSelectionStart] = useState("");
  const [selectionEnd, setSelectionEnd] = useState("");

  // Import du Token et ID de l'utilisateur connecté
  const userToken = useSelector((state) => state.user.value.token);
  const userId = useSelector((state) => state.user.value._id);

  const handleOnPress = (instru) => {
    if (!instrumentList.includes(instru)) {
      setInstrumentList([...instrumentList, instru]);
    } else {
      setInstrumentList(instrumentList.filter((e) => e !== instru));
    }
  };

  const handleOnPressTwo = (accom) => {
    if (!accomodation.includes(accom)) {
      setAccomodation([...accomodation, accom]);
    } else {
      setAccomodation(accomodation.filter((e) => e !== accom));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleValueChange = (value) => {
    setValue(value);
    const selectedItem = items.find((item) => item.value === value);
    setSelectedOption(selectedItem ? selectedItem.label : "");
  };

  useEffect(() => {
    if (value !== null) {
      const selectedItem = items.find((item) => item.value === value);
      setSelectedOption(selectedItem ? selectedItem.label : "");
    }
  }, [value]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    const source = { uri: result.assets[0].uri }
    console.log(source)
    setImage(source)

    if (!result.canceled) {
      console.log(result);
      // Step 1: Envoyer l'image à Firebase Storage
      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();

      // Initialise le stockage
      const storage = getStorage(firebase);
      // permet d'avoir un nom de fichier composé de chiffres et de lettres aléatoires
      const imageName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.jpg`
      const storageRef = ref(storage, `images/${imageName}`);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(`Image en cours d'upload`);
        },
        (error) => {
          console.error(`Erreur d'upload d'image: `, error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(`Image disponible à l'URL: `, downloadURL);

            // Step 2: Envoyer l'URL reçue au backend
            setImage(downloadURL);
          });
        }
      );
    } else {
      alert("Aucune image sélectionnée !");
    }
  };

  //Calendrier :

  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Di.", "Lu.", "Ma.", "Me.", "Je.", "Ve.", "Sa."],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "fr";

  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    if (!selectionStart || (selectionStart && selectionEnd)) {
      // Début nouvelle période
      setSelectionStart(selectedDate);
      console.log("start-period", selectedDate);
      setSelectionEnd(null);

      setMarkedDates({
        [selectedDate]: {
          selected: true,
          startingDay: true,
          endingDay: true,
          color: "#5100FF",
        },
      });
    } else {
      // Complète la sélection de la période
      const newSelectionEnd = selectedDate;
      if (isBefore(new Date(newSelectionEnd), new Date(selectionStart))) {
        setSelectionStart(newSelectionEnd);

        setSelectionEnd(selectionStart);
      } else {
        setSelectionEnd(newSelectionEnd);
      }
      markPeriod(selectionStart, newSelectionEnd);
      console.log("end-period", newSelectionEnd);
    }
  };

  const markPeriod = (start, end) => {
    const interval = eachDayOfInterval({
      start: new Date(start),
      end: new Date(end),
    });

    const newMarkedDates = {};
    interval.forEach((date, index) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      newMarkedDates[formattedDate] = {
        selected: true,
        startingDay: index === 0,
        endingDay: index === interval.length - 1,
        color: "blue",
      };
    });

    setMarkedDates(newMarkedDates);
  };

  // fetch vers la DB pour envoyer les données des inputs
  const handleSubmit = () => {
    fetch(`https://gigsterbackend.vercel.app/announces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        host: userId,
        address: [
          {
            street: street,
            city: city,
            zipcode: zipCode,
          },
        ],
        availableDates: [
          {
            startDateAt: new Date(selectionStart),
            endDateAt: new Date(selectionEnd),
          },
        ],
        locationType: [selectedOption],
        instrumentsAvailable: instrumentList,
        capacity: sliderValue,
        description: description,
        accessibility: accessibilityCheckbox,
        medias: [image],
        accomodation: {
          sleeping: accomodation.includes("Hébergement"),
          restauration: accomodation.includes("Restauration"),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("Announce created");
          navigation.navigate("TabNavigator", { screen: "Home" });
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Adresse de votre lieu d'accueil :</Text>
          <TextInput
            placeholder="Indiquez la rue"
            style={styles.input_address}
            onChangeText={setStreet}
            value={street}
          />
          <TextInput
            placeholder="Indiquez la ville"
            style={styles.input_address}
            onChangeText={setCity}
            value={city}
          />
          <TextInput
            placeholder="Indiquez le code postal"
            style={styles.input_address}
            keyboardType="numeric"
            onChangeText={setZipCode}
            value={zipCode}
          />
        </View>

        <View>
          <Text style={styles.title}>Décrivez votre lieu d'accueil :</Text>
          <TextInput
            placeholder="Description du lieu d'accueil"
            style={styles.input_description}
            multiline={true}
            onChangeText={setDescription}
            value={description}
          />
        </View>

        {/*Dropdown list concernant le type de lieu d'accueil*/}
        <View style={styles.block_container}>
          <Text style={styles.title}>
            Choisissez le type de votre lieu d'accueil :
          </Text>

          <TouchableOpacity
            style={styles.button}
            title="Choisir"
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.button_text}>Choisir</Text>
          </TouchableOpacity>
          {selectedOption ? (
            <Text style={styles.selectedOption}>
              Type de lieu choisi : {selectedOption}
            </Text>
          ) : null}
        </View>

        {/*Checkbox de validation pour lieu accessible aux handicapés*/}
        <View style={styles.accesibility}>
          <Text style={styles.title}>Accessibilité :</Text>
          <BouncyCheckbox
            size={25}
            fillColor="#5100FF"
            unFillColor="#FFFFFF"
            text="Lieu accessible aux handicapés"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{
              fontFamily: "JosefinSans-Regular",
              fontWeight: "600",
              textDecorationLine: "none",
            }}
            isChecked={accessibilityCheckbox}
            onPress={() => setAccessibilityCheckbox(!accessibilityCheckbox)}
          />
        </View>

        {/*Bloc sur les services mis à disposition des artistes par l'hôte*/}
        <View style={styles.block_container}>
          <Text style={styles.title}>
            Sélectionnez les services disponibles :
          </Text>
          <TouchableOpacity
            style={[
              styles.accomodationButton,
              {
                borderColor: accomodation.includes("Restauration")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPressTwo("Restauration")}
          >
            <Text style={styles.instrument_text}>Restauration 🍽</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.accomodationButton,
              {
                borderColor: accomodation.includes("Hébergement")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPressTwo("Hébergement")}
          >
            <Text style={styles.instrument_text}>Hébergement 🛏</Text>
          </TouchableOpacity>
        </View>

        {/*Bloc instruments mis à la disponibilité des artistes par l'hôte*/}
        <View style={styles.block_container}>
          <Text style={styles.title}>
            Sélectionnez les instruments que vous pouvez mettre à disposition
            des artistes :
          </Text>
          <TouchableOpacity
            style={[
              styles.instrumentButton,
              {
                borderColor: instrumentList.includes("Piano")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPress("Piano")}
          >
            <Text style={styles.instrument_text}>Piano</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.instrumentButton,
              {
                borderColor: instrumentList.includes("Batterie")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPress("Batterie")}
          >
            <Text style={styles.instrument_text}>Batterie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.instrumentButton,
              {
                borderColor: instrumentList.includes("Ampli")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPress("Ampli")}
          >
            <Text style={styles.instrument_text}>Ampli</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.instrumentButton,
              {
                borderColor: instrumentList.includes("Système son")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPress("Système son")}
          >
            <Text style={styles.instrument_text}>Système son</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.instrumentButton,
              {
                borderColor: instrumentList.includes("Table de mixage")
                  ? "green"
                  : "black",
              },
            ]}
            onPress={() => handleOnPress("Table de mixage")}
          >
            <Text style={styles.instrument_text}>Table de mixage</Text>
          </TouchableOpacity>
        </View>

        {/*Ajout de photos via la galerie du téléphone*/}
        <View style={styles.block_container}>
          <Text style={styles.title}>Ajoutez une image à votre annonce :</Text>
          <TouchableOpacity
            style={styles.button}
            title="Choisir mon image"
            onPress={pickImageAsync}
          >
            <Text style={styles.button_text}>Choisir</Text>
          </TouchableOpacity>
        </View>

        {/*Slider sur la capacité d'accueil de l'hôte*/}
        <View>
          <Text style={styles.title}>Capacité d'accueil:</Text>

          <Text>Capacité: {sliderValue}</Text>

          <Slider
            style={{ width: 350, height: 45 }}
            minimumValue={10}
            maximumValue={200}
            minimumTrackTintColor="#5100FF"
            maximumTrackTintColor="#000000"
            step={10}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          />
        </View>

        {/* Calendrier */}
        <View style={styles.block_container}>
          <Text style={styles.title}>
            Indiquez les plages de disponibilité de votre lieu d'accueil:
          </Text>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={350}
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={"period"}
            theme={{
              monthTextColor: "#5100FF",
              todayTextColor: "#5100FF",
              dayTextColor: "#2d4150",
              indicatorColor: "#5100FF",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
        </View>

        {/*    BUTTON SUBMIT    */}

        <View style={styles.block_container_submit}>
          <TouchableOpacity
            style={styles.button}
            title="Submit"
            onPress={() => handleSubmit()}
          >
            <Text style={styles.button_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal pour le DropDownPicker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Choisissez votre type lieu d'accueil :
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Type de lieu d'accueil..."}
            containerStyle={{
              height: open ? 200 : 40,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <TouchableOpacity
            style={styles.button}
            title="Fermer"
            onPress={handleCloseModal}
          >
            <Text style={styles.button_text}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#e1f5ff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#5100FF",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  button_text: {
    color: "white",
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  input_address: {
    backgroundColor: "white",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginTop: 5,
  },
  input_description: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    marginTop: 5,
  },
  instrument_text: {
    fontSize: 15,
  },
  dropdownlist_lieu_accueil: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    zIndex: 1000,
  },
  accesibility: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    zIndex: 10,
  },
  block_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    zIndex: 10,
  },
  accomodationButton: {
    backgroundColor: "white",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  instrumentButton: {
    backgroundColor: "white",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    marginTop: 10,
  },
  selectedOption: {
    marginTop: 10,
    fontSize: 16,
    color: "blue",
  },
  modalView: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  add_image: {
    marginTop: 5,
    marginBottom: 10,
  },
  block_container_submit: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    zIndex: 10,
    paddingBottom: 100,
  },
});
