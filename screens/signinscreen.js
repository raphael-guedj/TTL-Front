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

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Text style={[styles.text, { fontFamily: "OpenSans_400Regular" }]}>
            Inscrivez vous !
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 68 }}>
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
            // textContentType={"emailAddress"}
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
              fontFamily: "OpenSans_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "#fafae0",
            }}
          />
          <Input
            placeholder="Confirmez le mot de passe"
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
        </View>
        <Button
          buttonStyle={styles.button}
          title="C'est parti"
          onPress={() => {
            navigation.navigate("Carrousel");
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
    fontSize: 34,
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
});

export default SignUpScreen;
