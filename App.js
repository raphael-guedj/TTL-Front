import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import pseudo from "./reducers/pseudo";
import id from "./reducers/id";
import token from "./reducers/token";
import { AppLoading } from "expo";

import SignUpScreen from "./Screens/SignUpScreen";
import SignInScreen from "./Screens/SignInScreen";
import LandingScreen from "./Screens/LandingScreen";
import CarouselScreen from "./Screens/CarouselScreen";
import HomeScreen from "./Screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { AnnieUseYourTelescope_400Regular } from "@expo-google-fonts/annie-use-your-telescope";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ pseudo, id, token }));

const NotifStack = () => {
  return (
    <Stack.Navigator initialRouteName="NotifEnvoye">
      <Stack.Screen name="NotifEnvoye" component={HomeScreen} />
      <Stack.Screen name="NotifRecu" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HomeNotif" component={NotifStack} />
    </Stack.Navigator>
  );
};
const LunchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Lunch">
      <Stack.Screen name="Lunch" component={HomeScreen} />
      <Stack.Screen name="LunchNotif" component={NotifStack} />
      <Stack.Screen name="Detail" component={HomeScreen} />
      <Stack.Screen name="Confirmation" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const ProfilStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profil">
      <Stack.Screen name="Profil" component={HomeScreen} />
      <Stack.Screen name="Modifier" component={HomeScreen} />
      <Stack.Screen name="Reglage" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const PageTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dejeunez") {
            iconName = "ios-search";
          } else if (route.name === "Forky") {
            iconName = "ios-list";
          } else if (route.name === "Profil") {
            iconName = "md-person";
          }
          return <Ionicons name={iconName} size={34} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#418581",
        inactiveTintColor: "#c2e1df",
        style: {
          backgroundColor: "#FAFAE0",
          paddingVertical: 8,
        },
      }}
    >
      <Tab.Screen name="Dejeunez" component={HomeStack} />
      <Tab.Screen name="Forky" component={LunchStack} />
      <Tab.Screen name="Profil" component={ProfilStack} />
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    AnnieUseYourTelescope_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingScreen" headerMode="none">
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="Inscription" component={SignUpScreen} />
            <Stack.Screen name="Connexion" component={SignInScreen} />
            <Stack.Screen name="Carousel" component={CarouselScreen} />
            <Stack.Screen name="Home" component={PageTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
