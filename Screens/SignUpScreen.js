import React, { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRIVATE_URL } from "../config";

// PRIVATE_URL
// Utilisation d'une constante pour simplifier la mise à jour de l'addresse IP à un seul endroit, sur le fichier "config.js"

const SignUpScreen = ({ setReduxUser, navigation }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

  const handleSignUp = async () => {
    setPasswordError(false);
    setSignupError(false);
    setEmptyField(false);
    if (
      pseudo !== "" &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password === passwordConfirm) {
        setPasswordError(false);
        let rawResponse = await fetch(`${PRIVATE_URL}/sign-up`, {
          method: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `name=${pseudo}&email=${email}&password=${password}`,
        });

        let response = await rawResponse.json();
        if (response.result) {
          setReduxUser({
            pseudo: response.user.name,
            id: response.user._id,
            token: response.user.token,
          });
          AsyncStorage.setItem("userToken", response.user.token);

          // navigation.navigate("Carousel");
          setSignupError(false);
        } else {
          setSignupError(true);
        }
      } else {
        setPasswordError(true);
      }
    } else {
      setEmptyField(true);
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
          <Text style={[styles.text, { fontFamily: "HappyMonkey_400Regular" }]}>
            Inscrivez-vous !
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 60 }}>
          <Input
            placeholder="Prénom"
            onChangeText={(e) => setPseudo(e)}
            value={pseudo}
            placeholderTextColor="#fbfcfd"
            leftIcon={<Feather name="edit" size={20} color="#fbfcfd" />}
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
          <Input
            placeholder="Confirmez mot de passe"
            onChangeText={(e) => setPasswordConfirm(e)}
            value={passwordConfirm}
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
          {passwordError && (
            <Text style={styles.passwordText}>
              Les deux mots de passe ne sont pas identiques
            </Text>
          )}
          {signupError && (
            <Text style={styles.passwordText}>
              L'email existe déjà en base de donnée
            </Text>
          )}
          {emptyField && (
            <Text style={styles.passwordText}>L'un des champs est vide.</Text>
          )}
        </View>
        <View>
          <Button
            buttonStyle={styles.button}
            title="C'est parti"
            onPress={() => {
              handleSignUp();
              setPassword(""), setPasswordConfirm("");
            }}
          ></Button>
          <Button
            buttonStyle={styles.buttonback}
            title="Retour en arrière"
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
    fontSize: 30,
    color: "#f5f3f4",
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
  passwordText: {
    textAlign: "center",
    color: "#eb4d4b",
    fontSize: 15,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setReduxUser: function (user) {
      dispatch({ type: "user", user });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
