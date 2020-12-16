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
import { Feather, Entypo } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRIVATE_URL } from "../config";

const SignInScreen = ({ setReduxUser, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseOk, setResponseOk] = useState(true);

  const handleSignIn = async () => {
    console.log(PRIVATE_URL);
    let rawResponse = await fetch(`${PRIVATE_URL}/sign-in`, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });

    let response = await rawResponse.json();
    // console.log(response);
    if (response.result) {
      setResponseOk(true);
      setReduxUser({
        pseudo: response.userExists.name,
        id: response.userExists._id,
        token: response.userExists.token,
      });
      AsyncStorage.setItem("userToken", response.userExists.token);
      // navigation.navigate("Carousel");
    } else {
      setResponseOk(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/lunch_bright.jpg")}
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
          <Text style={[styles.text, { fontFamily: "Salsa_400Regular" }]}>
            Connexion
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 68 }}>
          <Input
            placeholder="E-mail"
            onChangeText={(e) => setEmail(e)}
            value={email}
            textContentType={"emailAddress"}
            placeholderTextColor="#fbfcfd"
            leftIcon={<Entypo name="email" size={20} color="#fbfcfd" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 14,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fbfcfd",
            }}
          />
          <Input
            placeholder="Mot de passe"
            onChangeText={(e) => setPassword(e)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#fbfcfd"
            leftIcon={<Feather name="eye-off" size={20} color="#fbfcfd" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 14,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fbfcfd",
            }}
          />
          {!responseOk && (
            <Text style={styles.responseText}>
              Email ou mot de passe introuvable, re-vérifiez vos informations
            </Text>
          )}
        </View>
        <View>
          <Button
            buttonStyle={styles.button}
            title="Connexion"
            onPress={() => {
              handleSignIn();
            }}
          ></Button>

          <Button
            buttonStyle={styles.buttonback}
            title="Revenir en arrière"
            onPress={() => {
              navigation.navigate("LandingScreen");
            }}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 160,
    height: 160,
    justifyContent: "center",
  },
  text: {
    fontSize: 34,
    color: "#fbfcfd",
    paddingVertical: 20,
    letterSpacing: 3,
    lineHeight: 35,
  },
  image_hero: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#F9B34C",
    margin: 10,
    width: 250,
    borderRadius: 20,
  },
  buttonback: {
    backgroundColor: "#418581",
    margin: 10,
    width: 250,
    borderRadius: 20,
  },
  responseText: {
    textAlign: "center",
    color: "#eb4d4b",
    fontSize: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
      // console.log("dispatch", pseudo, id, token);
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);
