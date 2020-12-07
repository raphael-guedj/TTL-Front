import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { AppLoading } from "expo";
import SignUpScreen from "./screens/signupscreen";
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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import LandingScreen from "./Screens/LandingScreen";
import CarousselScreen from "./Screens/CarousselScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const store = createStore(combineReducers({}));

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
<<<<<<< HEAD
  return (
    <NavigationContainer>
      {/* Stack navigation pour les premières routes...Conditions a renseigner avec token ou pas aprés inscription en BDD */}
      <Stack.Navigator initialRouteName="LandingScreen" headerMode="none">
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="CarousselScreen" component={CarousselScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
=======
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_300Light,
    OpenSans_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // <Provider store={store}>
      <NavigationContainer>
        {/* Stack navigation pour les premières routes...Conditions a renseigner avec token ou pas aprés inscription en BDD */}
        <Stack.Navigator
          initialRouteName="Valider l'inscription"
          headerMode="none"
        >
          <Stack.Screen name="Valider l'inscription" component={SignUpScreen} />
          {/* <Stack.Screen name="Valider " component={SignInScreen} />
            <Stack.Screen name="Déjeunez" component={PageTab} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      // </Provider>
    );
  }
>>>>>>> main
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
