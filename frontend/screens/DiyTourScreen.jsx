import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function DiyTourScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hosts, setHosts] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [allPins, setAllPins] = useState([]);
  const [isGo, setIsGo] = useState(false);
  const [datesPins, setDatesPins] = useState([]);
  const [selectedHost, setSelectedHost] = useState([]);

  // Affichge du pin qui géoloc ma position
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location.coords);

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });

      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setCurrentPosition(location.coords);
      });
    })();
  }, []);

  // Affichage de tout les Markers de la map à l'initialisation de la map
  useEffect(() => {
    const fetchAnnounces = async () => {
      try {
        const response = await fetch(
          `https://gigster-app-backend.vercel.app/allAnnounces`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("ANNONCES:", data);

        const newPins = [];
        for (let elem of data.announces) {
          const addresse = elem.address[0].street.split(" ").join("+");
          const locationResponse = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${addresse}&zipcode=${elem.address[0].zipcode}&city=${elem.address[0].city}`
          );

          if (!locationResponse.ok) {
            throw new Error(
              `Location API error! Status: ${locationResponse.status}`
            );
          }

          const locationData = await locationResponse.json();
          const foundCoords = locationData.features[0];

          const coord = {
            availableDates: elem.availableDates,
            name: elem.host.firstname,
            description: elem.description,
            picture: elem.medias[0],
            coords: {
              latitude: foundCoords.geometry.coordinates[1],
              longitude: foundCoords.geometry.coordinates[0],
            },
          };

          newPins.push(coord);
        }

        setAllPins(newPins);
      } catch (error) {
        console.error("Error fetching announcements or locations:", error);
      }
    };

    fetchAnnounces();
  }, []);

  console.log("ALLPINS", allPins);
  const hostsPins = allPins.map((elem, i) => {
    return (
      <Marker
        coordinate={elem.coords}
        title={elem.name}
        description={elem.description}
        pinColor="#5100FF"
        key={i.toString()}
      >
        <Callout>
          <View style={styles.calloutContainer}>
            <Image source={{ uri: elem.picture }} style={styles.calloutImage} />
            <Text style={styles.calloutTitle}>{elem.name}</Text>
            <Text>{elem.description}</Text>
            <TouchableOpacity
              style={styles.btnSearch}
              onPress={() => {
                handleAddHost(elem);
              }}
            >
              <Text style={styles.textSearch}>Add</Text>
            </TouchableOpacity>
          </View>
        </Callout>
      </Marker>
    );
  });

  //FORMATTE LA DATE EN STRING
  const formattedDate = moment(date).format("DD/MM/YYYY");

  //VARIABLE MECHANISME DU CALENDRIER
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    hideDatePicker();
  };

  //RECHERCHE LA VILLE VIA L'INPUT
  const getCityLocation = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchCity}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length === 0) {
          console.log("City not found");
          return;
        }

        const foundCity = data.features[0];
        setMapRegion({
          latitude: foundCity.geometry.coordinates[1],
          longitude: foundCity.geometry.coordinates[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      });

    const filterPins = allPins.map((elem, i) => {
      if (
        new Date(elem.availableDates[0].startDateAt) <= date &&
        date <= new Date(elem.availableDates[0].endDateAt)
      ) {
        return (
          <>
            <Marker
              coordinate={elem.coords}
              title={elem.name}
              description={elem.description}
              pinColor="#5100FF"
              key={i.toString()}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Image
                    source={{ uri: elem.picture }}
                    style={styles.calloutImage}
                  />
                  <Text style={styles.calloutTitle}>{elem.name}</Text>
                  <Text>{elem.description}</Text>
                  <TouchableOpacity
                    style={styles.btnSearch}
                    onPress={() => {
                      handleAddHost(elem);
                    }}
                  >
                    <Text style={styles.textSearch}>Add</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          </>
        );
      }
    });
    setDatesPins(filterPins);

    setIsGo(!isGo);
  };

  const handleAddHost = (host) => {
    setSelectedHost((prevSelected) => [...prevSelected, host]);
  };

  //Affiche les hote selectionné sur la roadmap
  const tourSelection = selectedHost.map((elem, i) => {
    if (
      new Date(elem.availableDates[0].startDateAt) <= date &&
      date <= new Date(elem.availableDates[0].endDateAt)
    ) {
      return (
        <TouchableOpacity key={i.toString()} style={styles.date}>
          <Text style={styles.dateTxt}>{formattedDate}</Text>
          <Text>{elem.name}</Text>
          <TouchableOpacity style={styles.btnDate}>
            <Text style={styles.textSearch}>Go</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  });

  //ECRAN DE CHARGEMENT AVANT LA MAP
  if (!mapRegion) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFillObject} region={mapRegion}>
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="Me !"
            pinColor="#fecb2d"
          />
        )}
        {!isGo ? hostsPins : datesPins}
      </MapView>

      <View style={styles.topContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={"Where ?"}
          placeholderTextColor={"#666"}
          onChangeText={setSearchCity}
          value={searchCity}
          onFocus={() => setIsOpen(true)}
          onSubmitEditing={() => getCityLocation()}
        />

        {Platform.OS === "ios" ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleConfirm}
            style={styles.calendar}
            isVisible={isDatePickerVisible}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.btnSearch} onPress={showDatePicker}>
              <Text>{formattedDate}</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleConfirm}
                style={styles.calendar}
                isVisible={isDatePickerVisible}
              />
            )}
          </>
        )}

        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => {
            getCityLocation();
          }}
        >
          <Text style={styles.textSearch}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Mon Parcours </Text>
        <ScrollView style={styles.roadmap} showsVerticalScrollIndicator={false}>
          {tourSelection}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    position: "absolute",
    top: 40,
    width: "80%",
    marginLeft: "15%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 13,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  subTopContainer: {
    position: "absolute",
    top: 100,
    width: "50%",
    marginLeft: "25%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 13,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  textInput: {
    color: "#000",
    height: 45,
    width: "34%",
    paddingLeft: 10,
    fontSize: 16,
  },
  btnSearch: {
    backgroundColor: "#5100FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 100,
    width: "89%",
    height: "25%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginLeft: "5.5%",
    borderRadius: 13,
    borderWidth: 1.5,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    width: "50%",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 10,
  },
  roadmap: {
    backgroundColor: "white",
    width: "90%",
  },
  textSearch: {
    color: "white",
    fontWeight: "bold",
  },
  calloutAddBtn: {
    width: "100%",
    marginTop: 15,
    backgroundColor: "#5100FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 13,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  date: {
    marginTop: 15,
    flexDirection: "row",
    width: "90%",
    height: 40,
    borderColor: "#5100FF",
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
  },
  calendar: {
    backgroundColor: "white",
    color: "white",
  },
  dateTxt: {
    paddingRight: 5,
  },
  calloutContainer: {
    alignItems: "center",
    width: 150,
    padding: 0,
  },
  calloutImage: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

//RECHERCHE ET AFFICHE LES HÔTES DISPONIBLE
// function displayAvailableHost() {

//   //Recherche toutes les annonces correspondantes à la date choisie:
//   fetch(`http://${FRONT_IP}:3000/allAnnounces`)
//     .then(response => response.json())
//     .then(data => {
//       console.log("ANNONCES", data.announces[0].availableDates[0].endDateAt)
//       const hostsAvailable = []
//       console.log('DATE', date)
//       for (let elem of data.announces) {

//         if (new Date(elem.availableDates[0].startDateAt) <= date && date <= new Date(elem.availableDates[0].endDateAt)) {

//           hostsAvailable.push(elem)
//         }
//       }

//       setHosts(hostsAvailable)
//       console.log('Host', hostsAvailable)
//       //Cherche les coordinnées de l'adresse de l'annonce:
//       const coords = []
//       for (let elem of hostsAvailable) {

//         const addresse = elem.address[0].street.split(" ").join("+")
//         console.log("ADD", addresse)

//         fetch(`https://api-adresse.data.gouv.fr/search/?q=${addresse}&zipcode=${elem.address[0].zipcode}&city=${elem.address[0].city}`)
//           .then(response => response.json())
//           .then(data => {
//             console.log("API")

//             const foundCoords = data.features[0];
//             console.log(elem.description)
//             coords.push({

//               name: elem.host.firstname,
//               description: elem.description,
//               coords: {
//                 latitude: foundCoords.geometry.coordinates[1],
//                 longitude: foundCoords.geometry.coordinates[0]
//               }
//             })
//           })
//       }
//       console.log('hello')
//       console.log('COORDS TROUVEE', coords)
//       setCoordinates([...coordinates, coords])

//     })

// }
// console.log('COORD', coordinates)
// const hostsPins = coordinates.map((elem, i) => {
//   return (
//     <Marker coordinate={elem.coords} title={elem.name} description={elem.description} pinColor="#5100FF" key={i} />
//   )
// })
