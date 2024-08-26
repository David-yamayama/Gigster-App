import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LikedHostsScreen from "./screens/LikedHostsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddScreen from "./screens/AddScreen";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import stepper from "./reducers/stepper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user, stepper },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Add") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5100FF",
        tabBarInactiveTintColor: "#335561",
        tabBarShowLabel: false,
        tabBarStyle: {
          alignSelf: "center",
          position: "absolute",
          height: 60,
          width: "60%",
          borderColor: "black",
          borderRadius: 15,
          borderWidth: 2,
          borderTopWidth: 2,
          borderTopColor: "black",
          marginBottom: "3%",
          marginLeft: "20%",
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
        tabBarItemStyle: {
          ...Platform.select({
            ios: {
              marginBottom: -30,
            },
          }),
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LikedHostsScreen" component={LikedHostsScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
