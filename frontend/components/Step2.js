import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";


export default function Step2(props) {


  // Validation schema for artist
  const artistSchema = yup.object().shape({
    artistname: yup.string().required("Artist name is required"),
    members: yup
      .number()
      .required("Members is required")
      .min(1, "Must be at least 1 member"),
    genres: yup.string().required("Genre is required"),
    placeOrigin: yup.string().required("Place of origin is required"),
  });

  // Validation schema for host
  const hostSchema = yup.object().shape({
    description: yup.string().required("Description is required"),
    favoritesGenres: yup.string().required("Favorite genre is required"),
  });

  const initialValues = props.user.isArtist
    ? { artistname: "", members: "", genres: "", placeOrigin: "" }
    : { description: "", favoritesGenres: "" };

  const validationSchema = props.user.isArtist ? artistSchema : hostSchema;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("IS HOST===> ", props.user.isHost);
      if (props.user.isArtist) {
        props.updateUser({
          artist: {
            artistname: values.artistname,
            members: parseInt(values.members, 10),
            placeOrigin: values.placeOrigin,
            genres: values.genres.split(","),
          },
        });
      } else if (props.user.isHost) {
        props.updateUser({
          host: {
            description: values.description,
            favoritesGenres: values.favoritesGenres.split(","),
          },
        });
      }
      props.getNextPage(5);
    },
  });

  const previousPage = () => {
    props.getNextPage(3);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("Aucune image sélectionnée !");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Tell us about you !</Text>
          <View style={styles.stepContent}>
            {props.user.isArtist ? (
              <>
                <Text style={styles.label}>Artist or Project name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name"
                  onChangeText={formik.handleChange("artistname")}
                  onBlur={formik.handleBlur("artistname")}
                  value={formik.values.artistname}
                />
                {formik.touched.artistname && formik.errors.artistname ? (
                  <Text style={styles.error}>{formik.errors.artistname}</Text>
                ) : null}

                <Text style={styles.label}>Members</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number"
                  keyboardType="numeric"
                  onChangeText={formik.handleChange("members")}
                  onBlur={formik.handleBlur("members")}
                  value={formik.values.members}
                />
                {formik.touched.members && formik.errors.members ? (
                  <Text style={styles.error}>{formik.errors.members}</Text>
                ) : null}

                <Text style={styles.label}>Genre(s)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Genre"
                  onChangeText={formik.handleChange("genres")}
                  onBlur={formik.handleBlur("genres")}
                  value={formik.values.genres}
                />
                {formik.touched.genres && formik.errors.genres ? (
                  <Text style={styles.error}>{formik.errors.genres}</Text>
                ) : null}

                <Text style={styles.label}>Place of origin</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  onChangeText={formik.handleChange("placeOrigin")}
                  onBlur={formik.handleBlur("placeOrigin")}
                  value={formik.values.placeOrigin}
                />
                {formik.touched.placeOrigin && formik.errors.placeOrigin ? (
                  <Text style={styles.error}>{formik.errors.placeOrigin}</Text>
                ) : null}
              </>
            ) : (
              <>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.input_description}
                  placeholder="Description"
                  onChangeText={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Text style={styles.error}>{formik.errors.description}</Text>
                ) : null}

                <Text style={styles.label}>Favorite genre(s)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Favorite genre"
                  onChangeText={formik.handleChange("favoritesGenres")}
                  onBlur={formik.handleBlur("favoritesGenres")}
                  value={formik.values.favoritesGenres}
                />
                {formik.touched.favoritesGenres &&
                  formik.errors.favoritesGenres ? (
                  <Text style={styles.error}>
                    {formik.errors.favoritesGenres}
                  </Text>
                ) : null}
              </>
            )}
          </View>

          {/*Ajout de photos via la galerie du téléphone*/}
          <Text style={styles.label}>Add profil picture ?</Text>
          <TouchableOpacity
            style={styles.btn}
            title="Choisir mon image"
            onPress={pickImageAsync}
          >
            <Text style={styles.textBtn}>Add picture</Text>
          </TouchableOpacity>

          <View style={styles.button_navigation_container}>
            <TouchableOpacity style={styles.btn} onPress={previousPage}>
              <Text style={styles.textBtn}>Previous page</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
              <Text style={styles.textBtn}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingViewContainer: {
    flex: 1,
    backgroundColor: "#F3F4EB",
    width: "100%",
    paddingTop: 33,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#F3F4EB",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 15,
    color: "black",
  },
  stepContent: {
    width: "70%",
    padding: 20,
    backgroundColor: "#F3F4EB",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginTop: 10,
  },
  input: {
    height: 50,
    paddingTop: 10,
    borderRadius: 13,
    borderWidth: 2,
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
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
  input_description: {
    height: 150,
    paddingTop: 10,
    borderRadius: 13,
    borderWidth: 2,
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
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
  btn: {
    height: 60,
    width: "35%",
    margin: 20,
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
  textBtn: {
    backgroundColor: "#5100FF",
    height: 50,
    color: "#FFFFFF",
    fontSize: 16,
    paddingBottom: 13,
    paddingTop: 12,
    textAlign: "center",
    borderRadius: 13,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    overflow: "hidden",
  },
  button_navigation_container: {
    flexDirection: "row",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 5,
  },
});

/*import { useState } from "react";
import {
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text
} from "react-native";



export default function Step2(props) {

    // Variable d'états pour artiste
    const [step2Data, setStep2Data] = useState({
        artistname: '',
        members: 0,
        genres: [],
        placeOrigin: ''
    });

    // Variable d'états pour host
    const [hostStep2Data, setHostStep2Data] = useState({
        description: '',
        favoriteGenre: []
    });


    function submitInfos() {
        if (props.user.isArtist) {
            // Check artist fields
            if (!step2Data.artistname || !step2Data.members || !step2Data.genres || !step2Data.placeOrigin) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }



            //remonte les infos au parent via le props
            props.updateUser({
                artist: {
                    artistname: step2Data.artistname,
                    members: parseInt(step2Data.members, 10),
                    placeOrigin: step2Data.placeOrigin,
                    genres: step2Data.genres,
                }
            })
            props.sendData();


        } else if (props.user.isHost) {
            // Check host fields
            if (!hostStep2Data.description || !hostStep2Data.favoriteGenre) {
                Alert.alert('Validation Error', 'Please fill out all fields');
                return false;
            }

            //remonte les infos au parent via le props
            props.updateUser({
                host: {
                    description: hostStep2Data.description,
                    favoriteGenre: hostStep2Data.favoriteGenre,
                }
            })

            props.sendData();
        }
    };




    const previousPage = () => {
        props.getNextPage(2);
    };
    return (
        <View>
            <Text>Mon Profil</Text>
            {!props.user.isHost ? (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Artist name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="name"
                        value={step2Data.artistname}
                        onChangeText={text => setStep2Data({ ...step2Data, artistname: text })}
                    />
                    <Text style={styles.label}>Member</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Number"
                        value={step2Data.members}
                        keyboardType="numeric"
                        onChangeText={text => setStep2Data({ ...step2Data, members: text })}
                    />
                    <Text style={styles.label}>Genre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Genre"
                        value={step2Data.genres}
                        onChangeText={text => setStep2Data({ ...step2Data, genres: text })}
                    />
                    <Text style={styles.label}>Place of origin</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={step2Data.placeOrigin}
                        onChangeText={text => setStep2Data({ ...step2Data, placeOrigin: text })}
                    />
                </View>
            ) : (
                <View style={styles.stepContent}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={hostStep2Data.description}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, description: text })}
                    />
                    <Text style={styles.label}>Favorite genre(s)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Favorite genre"
                        value={hostStep2Data.favoriteGenre}
                        onChangeText={text => setHostStep2Data({ ...hostStep2Data, favoriteGenre: text })}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.btn} onPress={submitInfos}>
                <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={previousPage}>
                <Text style={styles.textBtn}>Previous</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainSelect: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    btn: {
        backgroundColor: '#5100FF',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 10
    },
    stepContent: {
        marginVertical: 20,
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
*/
