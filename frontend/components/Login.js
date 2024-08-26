import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateId,
  updateEmail,
  updateUsername,
  updateToken,
  updateArtist,
  updateHost,
  updateBirthdate,
  updateFirstname,
  updateLastname,
  updateAddress,
  updatePhoneNumber,
  getArtistInfos,
  getHostInfos,
} from "../reducers/user";
import { Formik } from "formik";
import * as Yup from "yup";
import { FRONT_IP } from "../hide-ip";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

// Définir les schémas de validation avec Yup

// SignIn Schema
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// SignUp Schema
const signUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Login(props, navigate) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSubmitSignIn = (values, { setSubmitting, setErrors }) => {
    fetch(`https://gigsterbackend.vercel.app/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("REPONSE DU BACK", data);
        setSubmitting(false);
        if (!data.result) {
          setErrors({ general: data.error });
        } else {
          delete data.data.artist._id;
          dispatch(updateId(data.data._id));
          dispatch(updateToken(data.data.token));
          dispatch(updateUsername(data.data.username));
          dispatch(updateEmail(data.email));
          dispatch(updateFirstname(data.data.firstname));
          dispatch(updateLastname(data.data.lastname));
          dispatch(updateAddress(data.data.address));
          dispatch(updatePhoneNumber(data.data.phoneNumber));
          dispatch(getArtistInfos(data.data.artist));
          dispatch(getHostInfos(data.data.host));
          dispatch(
            updateBirthdate(moment(data.data.birthdate).format("DD/MM/YYYY"))
          );
          dispatch(updateArtist(data.data.isArtist));
          dispatch(updateHost(data.data.isHost));
          console.log(data);

          navigation.navigate("TabNavigator", { screen: "Home" });
        }
      });
  };

  const handleSubmitSignUp = (values, { setSubmitting, setErrors }) => {
    if (values.password !== values.confirmPassword) {
      setErrors({ confirmPassword: "Passwords must match" });
      setSubmitting(false);
    } else {
      props.updateUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      props.getNextPage(2);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {!isSignIn ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={handleSubmitSignIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.signInContainer}>
                <Text style={styles.signin}>Welcome back</Text>
                <TextInput
                  placeholder="Email..."
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <TextInput
                  secureTextEntry
                  placeholder="Password..."
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                {errors.general && (
                  <Text style={styles.error}>{errors.general}</Text>
                )}
                <TouchableOpacity
                  style={styles.input_signin_button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.text_signin}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.bottom}>
                  <Text style={styles.bottom_text}>Pas encore inscrit ?</Text>
                  <Text
                    onPress={() => setIsSignIn(true)}
                    style={styles.bottom_signup}
                  >
                    Sign Up
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSubmitSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.signInContainer}>
                <Text style={styles.signup}>Create your account</Text>
                <TextInput
                  placeholder="Username"
                  style={styles.input}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}
                <TextInput
                  placeholder="name@example.com"
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <TextInput
                  secureTextEntry
                  placeholder="Insert your password"
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <TextInput
                  secureTextEntry
                  placeholder="Confirm your password"
                  style={styles.input}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
                {errors.general && (
                  <Text style={styles.error}>{errors.general}</Text>
                )}
                <TouchableOpacity
                  style={styles.input_signup_button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text style={styles.text_signup}>Next</Text>
                </TouchableOpacity>
                <View style={styles.bottomSignup}>
                  <Text style={styles.bottom_text}>Déjà inscrit ?</Text>
                  <Text
                    style={styles.bottom_signup}
                    onPress={() => setIsSignIn(false)}
                  >
                    Sign In
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        )}
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingViewContainer: {
    flex: 1,
    backgroundColor: "#F3F4EB",
    width: "100%",
    paddingTop: 36,

  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#F3F4EB",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 33,
  },
  signInContainer: {
    alignItems: "center",
    marginTop: "20%",
    height: "100%",
    width: "100%",
  },
  signup: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: "10%",
    color: "#black",
  },
  signin: {
    fontWeight: "bold",
    fontSize: 70,
    marginBottom: "20%",
    color: "#black",
  },
  titles: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
    color: "black",
    textShadowColors: "black",
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 4,
    // Effet d'ombre pour les appareils Android
    elevation: 4,
  },
  input: {
    height: 50,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 13,
    borderWidth: 2,
    marginTop: 20,
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
  input_username: {
    height: 40,
    width: "75%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_email: {
    height: 40,
    width: "75%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  input_password: {
    height: 40,
    width: "75%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 5,
  },
  text_signin: {
    backgroundColor: "#5100FF",
    color: "#FFFFFF",
    fontSize: 16,
    paddingBottom: 12,
    paddingTop: 13,
    height: "100%",
    width: "100%",
    textAlign: "center",
    borderRadius: 13,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    overflow: "hidden",
  },
  text_signup: {
    backgroundColor: "#5100FF",
    color: "#FFFFFF",
    fontSize: 16,
    paddingBottom: 12,
    paddingTop: 13,
    height: "100%",
    width: "100%",
    textAlign: "center",
    borderRadius: 13,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    overflow: "hidden",
  },
  input_signin_button: {
    height: 60,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: "10%",
    marginBottom: 10,
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
  input_signup_button: {
    height: 60,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: "10%",
    marginBottom: 10,
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
  bottom: {
    alignItems: "space-between",
    marginTop: "20%",
    flexDirection: "row",
  },
  bottom_text: {
    marginRight: "20%",
    width: "40%",
    fontWeight: "bold",
    fontSize: 15,
  },
  bottom_btn: {
    backgroundColor: "#ec2761",
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    padding: 5,
    borderRadius: 5,
  },
  bottom_signup: {
    color: "#5100FF",
    fontWeight: "bold",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  bottomSignup: {
    alignItems: "space-between",
    marginTop: "20%",
    flexDirection: "row",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  logo: {
    width: '42%',
    height: '20%',


  }
});
