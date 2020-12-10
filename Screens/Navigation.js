import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import LandingScreen from "./LandingScreen";
import CarouselScreen from "./CarouselScreen";
import HomeScreen from "./HomeScreen";
import UserProfilScreen from "./UserProfilScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";

import { HeaderBarImage, IconBar } from "./ImageHeaderBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const StackHome = createStackNavigator();
const StackNotif = createStackNavigator();
const StackLunch = createStackNavigator();
const StackProfil = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          title: "Accueil",
          headerStyle: {
            backgroundColor: "#Fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",
          headerLeft: () => <HeaderBarImage />,
          headerRight: () => <IconBar />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <StackHome.Screen name="HomeNotif" component={NotifStack} />
      <StackHome.Screen
        options={{
          title: "Profil",
          headerStyle: {
            backgroundColor: "#Fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerRight: () => <IconBar />,
        }}
        name="Profil Utilisateur"
        component={UserProfilScreen}
      />
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
      <StackProfil.Screen name="Profil" component={ProfileScreen} />
      <StackProfil.Screen name="Modifier" component={EditProfileScreen} />
      <StackProfil.Screen name="Reglage" component={SettingsScreen} />
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
        } else if (route.name === "Mes Forky") {
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
        backgroundColor: "#FFF",
        paddingVertical: 8,
      },
    }}
  >
    <Tab.Screen name="Dejeunez" component={HomeStack} />
    <Tab.Screen name="Mes Forky" component={LunchStack} />
    <Tab.Screen name="Profil" component={ProfilStack} />
  </Tab.Navigator>
);

function Navigation({ setReduxUser, userState }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      await AsyncStorage.getItem("userToken", function (error, data) {
        // console.log("data", data);
        setToken(data);
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserDB = async () => {
      if (token) {
        var rawResponse = await fetch(
          "http://172.16.0.21:3000/get-user?token=" + token
        );

        const jsonResponse = await rawResponse.json();
        // console.log("ma réponse", jsonResponse);

        setReduxUser({
          pseudo: jsonResponse.user.name,
          id: jsonResponse.user._id,
          token: jsonResponse.user.token,
        });
      }
    };
    getUserDB();
  }, [token]);

  useEffect(() => {
    setToken(userState.token);
  }, [userState]);

  return userState.token ? (
    PageTab
  ) : (
    <Stack.Navigator initialRouteName="LandingScreen" headerMode="none">
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Inscription" component={SignUpScreen} />
      <Stack.Screen name="Connexion" component={SignInScreen} />
      {/* <Stack.Screen name="Carousel" component={CarouselScreen} /> */}
    </Stack.Navigator>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
    },
  };
}

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
