import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import LogOutScreen from "./Screens/LogOutScreen";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const StackHome = createStackNavigator();
const StackNotif = createStackNavigator();
const StackLunch = createStackNavigator();
const StackProfil = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ pseudo, id, token }));

const NotifStack = () => {
  return (
    <StackNotif.Navigator initialRouteName="NotifEnvoye">
      <StackNotif.Screen name="NotifEnvoye" component={HomeScreen} />
      <StackNotif.Screen name="NotifRecu" component={HomeScreen} />
    </StackNotif.Navigator>
  );
};

const HomeStack = () => {
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        options={{
          title: "My home",
          headerStyle: {
            backgroundColor: "#FAFAE0",
          },
          headerTintColor: "#0b090a",
        }}
        name="Home"
        component={HomeScreen}
      />
      <StackHome.Screen name="HomeNotif" component={NotifStack} />
    </StackHome.Navigator>
  );
};
const LunchStack = () => {
  return (
    <StackLunch.Navigator>
      <StackLunch.Screen name="Lunch" component={HomeScreen} />
      <StackLunch.Screen name="LunchNotif" component={NotifStack} />
      <StackLunch.Screen name="Detail" component={HomeScreen} />
      <StackLunch.Screen name="Confirmation" component={HomeScreen} />
    </StackLunch.Navigator>
  );
};

const ProfilStack = () => {
  return (
    <StackProfil.Navigator>
      <StackProfil.Screen name="Profil" component={HomeScreen} />
      <StackProfil.Screen name="Modifier" component={HomeScreen} />
      <StackProfil.Screen name="Reglage" component={HomeScreen} />
    </StackProfil.Navigator>
  );
};

const PageTab = (
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

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem(
        "userToken",
        function (error, data) {
          setToken(data);
        }
      );
    })();
  }, []);

  console.log("token", token);

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
          {token ? (
            PageTab
          ) : (
            <Stack.Navigator initialRouteName="LandingScreen" headerMode="none">
              <Stack.Screen name="LandingScreen" component={LandingScreen} />
              <Stack.Screen name="Inscription" component={SignUpScreen} />
              <Stack.Screen name="Connexion" component={SignInScreen} />
              <Stack.Screen name="Carousel" component={CarouselScreen} />
            </Stack.Navigator>
          )}
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
