import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./reducers/user";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { CarterOne_400Regular } from "@expo-google-fonts/carter-one";

import { HappyMonkey_400Regular } from "@expo-google-fonts/happy-monkey";

import { FaunaOne_400Regular } from "@expo-google-fonts/fauna-one";
import Navigation from "./Screens/Navigation";

const store = createStore(combineReducers({ user }));

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    FaunaOne_400Regular,
    CarterOne_400Regular,
    HappyMonkey_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    );
  }
}
