import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOutScreen = ({ navigation }) => {
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

  const handleLogOut = async () => {
    AsyncStorage.removeItem("userToken");
  };

  return (
    <ImageBackground
      source={require("../assets/lunch.jpg")}
      style={styles.image_hero}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../assets/Logo_Forky_light.png")}
          ></Image>
          <Text
            style={[
              styles.text,
              { fontFamily: "AnnieUseYourTelescope_400Regular" },
            ]}
          >
            Déconnexion
          </Text>
        </View>

        <Button
          buttonStyle={styles.button}
          title="Déconnexion"
          onPress={() => {
            handleLogOut();
          }}
        ></Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#000000a0",
  },
  logo: {
    width: 160,
    height: 160,
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "#fafae0",
    paddingVertical: 20,
    letterSpacing: 4,
    lineHeight: 35,
  },
  image_hero: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1,
  },
  button: {
    backgroundColor: "#F9B34C",
    margin: 10,
    width: 250,
    borderRadius: 20,
  },
  responseText: {
    textAlign: "center",
    color: "#d90429",
    fontStyle: "italic",
    fontSize: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (pseudo, id, token) {
      dispatch({ type: "userdata", pseudo, id, token });
      console.log("dispatch", pseudo, id, token);
    },
  };
}

export default connect(null, mapDispatchToProps)(LogOutScreen);
