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
import { AnnieUseYourTelescope_400Regular } from "@expo-google-fonts/annie-use-your-telescope";
import { FaunaOne_400Regular } from "@expo-google-fonts/fauna-one";
import Navigation from "./Screens/Navigation";

const store = createStore(combineReducers({ user }));

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
    AnnieUseYourTelescope_400Regular,
    FaunaOne_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
<<<<<<< HEAD
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
=======
          <Navigation />
>>>>>>> main
        </NavigationContainer>
      </Provider>
    );
  }
}
