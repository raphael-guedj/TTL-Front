import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import LandingScreen from "./LandingScreen";
import HomeScreen from "./HomeScreen";
import UserProfilScreen from "./UserProfilScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfilScreen from "./EditProfileScreen";
import InvitationScreen from "./InvitationScreen";
import SnapScreen from "./SnapScreen";
import MyLunchesScreen from "./MyLunchesScreen";
import NotifScreenSent from "./NotifScreenSent";
import NotifScreenReceived from "./NotifScreenReceived";
import { HeaderBarImage, IconBar, SettingsBar } from "./ImageHeaderBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import { PRIVATE_URL } from "../config";

const Stack = createStackNavigator();
const StackHome = createStackNavigator();
const TopTabNotif = createMaterialTopTabNavigator();
const StackLunch = createStackNavigator();
const StackProfil = createStackNavigator();
const Tab = createBottomTabNavigator();

const NotifStack = () => {
  return (
    <TopTabNotif.Navigator
      tabBarOptions={{
        activeTintColor: "#418581",
        indicatorStyle: { backgroundColor: "#F9B34C", height: 1 },
        labelStyle: { fontSize: 12 },
        style: {
          marginTop: 10,
          height: 45,
        },
      }}
      initialRouteName="Invitations envoyées"
    >
      <TopTabNotif.Screen
        name="Invitations envoyées"
        component={NotifScreenSent}
      />
      <TopTabNotif.Screen
        name="Invitations reçues"
        component={NotifScreenReceived}
      />
    </TopTabNotif.Navigator>
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
          // headerRight: () => <IconBar />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <StackHome.Screen
        options={{
          title: "Mes invitations",
          headerStyle: {
            backgroundColor: "#Fff",
            height: 90,
          },
          headerTitleAlign: "center",
        }}
        name="Notifications"
        component={NotifStack}
      />
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
      <StackHome.Screen
        name="Modifier mon profil"
        component={EditProfilScreen}
        options={{
          title: "Modifier mon profil",
          headerStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",
        }}
      />
      <StackHome.Screen name="Photo" component={SnapScreen} />
      <StackHome.Screen
        options={{
          title: "Envoyer une invitation",
          headerStyle: {
            backgroundColor: "#Fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerRight: () => <IconBar />,
        }}
        name="Envoyer une invitation"
        component={InvitationScreen}
      />
      <StackHome.Screen
        options={{
          title: "Mes Forkys",
          headerStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerLeft: () => <HeaderBarImage />,
          headerRight: () => <IconBar />,
        }}
        name="Mes Forkys"
        component={MyLunchesScreen}
      />
    </StackHome.Navigator>
  );
};
const LunchStack = () => {
  return (
    <StackLunch.Navigator>
      <StackLunch.Screen
        options={{
          title: "Mes Forkys",
          headerStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerLeft: () => <HeaderBarImage />,
          headerRight: () => <IconBar />,
        }}
        name="Mes Forkys"
        component={MyLunchesScreen}
      />
      <StackLunch.Screen name="Confirmation" component={MyLunchesScreen} />
    </StackLunch.Navigator>
  );
};

const ProfilStack = () => {
  return (
    <StackProfil.Navigator>
      <StackProfil.Screen
        options={{
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerLeft: () => <HeaderBarImage />,
          headerRight: () => <SettingsBar />,
        }}
        name="Mon Profil"
        component={ProfileScreen}
      />
      <StackProfil.Screen
        options={{
          title: "Mes Forkys",
          headerStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",

          headerLeft: () => <HeaderBarImage />,
          headerRight: () => <IconBar />,
        }}
        name="Mes Forkys"
        component={MyLunchesScreen}
      />
      <StackProfil.Screen
        options={{
          title: "Modifier mon profil",
          headerStyle: {
            backgroundColor: "#fff",
            height: 90,
          },
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",
        }}
        name="Modifier mon profil"
        component={EditProfilScreen}
      />
      <StackProfil.Screen name="Photo" component={SnapScreen} />
      <StackProfil.Screen
        name="Réglages"
        options={{
          headerTitleAlign: "center",
          headerTintColor: "#0b090a",
        }}
        component={SettingsScreen}
      />
    </StackProfil.Navigator>
  );
};

const PageTab = (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "homeTab") {
          iconName = "ios-search";
        } else if (route.name === "forkyTab") {
          iconName = "ios-list";
        } else if (route.name === "profilTab") {
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
    <Tab.Screen
      name="homeTab"
      component={HomeStack}
      options={{
        title: "Déjeuner",
      }}
    />
    <Tab.Screen
      name="forkyTab"
      component={LunchStack}
      options={{
        title: "Mes Forkys",
      }}
    />
    <Tab.Screen
      name="profilTab"
      component={ProfilStack}
      options={{
        title: "Mon profil",
      }}
    />
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
        var rawResponse = await fetch(`${PRIVATE_URL}/get-user?token=` + token);

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
