import React, { useState } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

// Schéma de validation yup
const validationSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  zipcode: yup.string().required("Zipcode is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  birthdate: yup.date().required("Birthdate is required"),
});

export default function Step1(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  function nextStep(values) {

    props.updateUser({
      address: {
        street: values.street,
        city: values.city,
        zipcode: values.zipcode,
      },
      firstname: values.firstname,
      lastname: values.lastname,
      birthdate: values.birthdate,
      phoneNumber: values.phoneNumber,
    });
  }

  const handleDateChange = (event, selectedDate, setFieldValue) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFieldValue("birthdate", selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            street: "",
            city: "",
            zipcode: "",
            phoneNumber: "",
            birthdate: new Date(),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => nextStep(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.container}>
              <Text style={styles.title}>Complete your infos !</Text>
              <View style={styles.stepContent}>
                <Text style={styles.label}>Lastname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Lastname"
                  onChangeText={handleChange("lastname")}
                  onBlur={handleBlur("lastname")}
                  value={values.lastname}
                />
                {touched.lastname && errors.lastname && (
                  <Text style={styles.error}>{errors.lastname}</Text>
                )}

                <Text style={styles.label}>Firstname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Firstname"
                  onChangeText={handleChange("firstname")}
                  onBlur={handleBlur("firstname")}
                  value={values.firstname}
                />
                {touched.firstname && errors.firstname && (
                  <Text style={styles.error}>{errors.firstname}</Text>
                )}

                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Street"
                  onChangeText={handleChange("street")}
                  onBlur={handleBlur("street")}
                  value={values.street}
                />
                {touched.street && errors.street && (
                  <Text style={styles.error}>{errors.street}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="City"
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />
                {touched.city && errors.city && (
                  <Text style={styles.error}>{errors.city}</Text>
                )}

                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Postal Code"
                  onChangeText={handleChange("zipcode")}
                  onBlur={handleBlur("zipcode")}
                  value={values.zipcode}
                />
                {touched.zipcode && errors.zipcode && (
                  <Text style={styles.error}>{errors.zipcode}</Text>
                )}

                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Phone number"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}

                <Text style={styles.label}>Birthdate</Text>

                {Platform.OS === "ios" ? (
                  //SI UTILISATEUR SOUS IOS
                  <DateTimePicker
                    value={values.birthdate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) =>
                      handleDateChange(event, selectedDate, setFieldValue)
                    }
                    locale="fr-FR"
                  />
                ) : (
                  //SI UTILISATEUR SOUS ANDROID
                  <>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <TextInput
                        style={styles.input}
                        placeholder="Select Birthdate"
                        value={values.birthdate.toDateString()}
                        editable={false} // Prevent direct editing
                      />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={values.birthdate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          handleDateChange(event, selectedDate, setFieldValue);
                          setShowDatePicker(false); // Close the picker after selecting a date
                        }}
                        locale="fr-FR"
                      />
                    )}
                  </>
                )}

                {touched.birthdate && errors.birthdate && (
                  <Text style={styles.error}>{errors.birthdate}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.textBtn}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
    fontSize: 35,
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
  datePicker: {
    width: "100%",
    marginTop: 10,
  },
  btn: {
    height: 60,
    width: "30%",
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});
