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

const SignUpScreen = ({ navigation, setReduxUser }) => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {}, []);

  const handleSignUp = async () => {
    if (password === passwordConfirm && pseudo !== "" && email !== "") {
      setPasswordError(false);
      let rawResponse = await fetch("http://172.16.0.22:3000/sign-up", {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${pseudo}&email=${email}&password=${password}`,
      });

      let response = await rawResponse.json();
      console.log(response);
      if (response.result) {
        setReduxUser(pseudo, response.user._id, response.user.token);
        navigation.navigate("Connexion");
      }
    } else {
      setPasswordError(true);
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
            Inscrivez-vous !
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 60 }}>
          <Input
            placeholder="Prénom"
            onChangeText={(e) => setPseudo(e)}
            value={pseudo}
            placeholderTextColor="#fafae0"
            leftIcon={<Ionicons name="ios-person" size={30} color="#fafae0" />}
            leftIconContainerStyle={{
              marginHorizontal: 8,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "OpenSans_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
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
              fontFamily: "OpenSans_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          <Input
            placeholder="Password"
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
              fontFamily: "OpenSans_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          <Input
            placeholder="Confirmez le password"
            onChangeText={(e) => setPasswordConfirm(e)}
            value={passwordConfirm}
            secureTextEntry={true}
            placeholderTextColor="#fafae0"
            leftIcon={<Ionicons name="ios-eye-off" size={30} color="#fafae0" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "OpenSans_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          {passwordError && (
            <Text style={styles.passwordText}>
              Les deux mots de passe ne sont pas identiques
            </Text>
          )}
        </View>
        <Button
          buttonStyle={styles.button}
          title="C'est parti"
          onPress={() => {
            handleSignUp();
            setPassword(""), setPasswordConfirm("");
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
  passwordText: {
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

export default connect(null, mapDispatchToProps)(SignUpScreen);
