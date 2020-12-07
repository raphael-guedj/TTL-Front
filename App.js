import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import pseudo from "./reducers/pseudo";
import id from "./reducers/id";
import token from "./reducers/token";
import { AppLoading } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignUpScreen from "./Screens/SignUpScreen";
import SignInScreen from "./Screens/SignInScreen";
import LandingScreen from "./Screens/LandingScreen";
import CarouselScreen from "./Screens/CarouselScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_300Light,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { AnnieUseYourTelescope_400Regular } from "@expo-google-fonts/annie-use-your-telescope";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ pseudo, id, token }));

// const PageTab = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = "ios-search";
//           } else if (route.name === "Forky") {
//             iconName = "ios-list";
//           } else if (route.name === "Profil") {
//             iconName = "md-person";
//           }
//           return <Ionicons name={iconName} size={34} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: "#418581",
//         inactiveTintColor: "#f5f5c3",
//         style: {
//           backgroundColor: "#FAFAE0",
//           paddingVertical: 8,
//         },
//       }}
//     >
//       <Tab.Screen name="Déjeunez" component={HomeScreen} />
//       <Tab.Screen name="Mes Forky" component={LunchScreen} />
//       <Tab.Screen name="Mon Profil" component={ProfilScreen} />
//     </Tab.Navigator>
//   );
// };

export default function App() {
  useEffect(() => {
    const getUserToken = async () => {
      var userToken = await AsyncStorage.getItem(
        "userToken",
        function (error, data) {
          console.log(data);
        }
      );
    };
    getUserToken();
  }, []);

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_300Light,
    OpenSans_800ExtraBold,
    AnnieUseYourTelescope_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {/* Stack navigation pour les premières routes...Conditions a renseigner avec token ou pas aprés inscription en BDD */}
          <Stack.Navigator initialRouteName="LandingScreen" headerMode="none">
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="Inscription" component={SignUpScreen} />
            <Stack.Screen name="Connexion" component={SignInScreen} />
            <Stack.Screen name="Carousel" component={CarouselScreen} />
            {/* <Stack.Screen name="Déjeunez" component={PageTab} /> */}
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
