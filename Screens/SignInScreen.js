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

const SignInScreen = ({ setReduxUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseOk, setResponseOk] = useState(true);

  const handleSignIn = async () => {
    let rawResponse = await fetch("http://172.16.0.22:3000/sign-in", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });

    let response = await rawResponse.json();
    // console.log(response);
    if (response.result) {
      setResponseOk(true);
      setReduxUser({
        name: response.userExists.name,
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
            Connexion
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 68 }}>
          <Input
            placeholder="E-mail"
            onChangeText={(e) => setEmail(e)}
            value={email}
            textContentType={"emailAddress"}
            placeholderTextColor="#fafae0"
            leftIcon={<Ionicons name="ios-mail" size={30} color="#fafae0" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          <Input
            placeholder="Mot de passe"
            onChangeText={(e) => setPassword(e)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#fafae0"
            leftIcon={<Ionicons name="ios-eye-off" size={30} color="#fafae0" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          {!responseOk && (
            <Text style={styles.responseText}>
              Email ou mot de passe introuvable, re-vérifiez vos informations
            </Text>
          )}
        </View>
        <Button
          buttonStyle={styles.button}
          title="Connexion"
          onPress={() => {
            handleSignIn();
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
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
      // console.log("dispatch", pseudo, id, token);
    },
  };
}

export default connect(null, mapDispatchToProps)(SignInScreen);
