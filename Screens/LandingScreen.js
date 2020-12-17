import React from "react";
import { Button } from "react-native-elements";
import { Text, View, ImageBackground, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function LandingScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/lunch_bright.jpg")}
      style={styles.image}
    >
      <View style={styles.view}>
        <Image
          source={require("../assets/Logo_Forky_light.png")}
          style={styles.logo}
        ></Image>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text style={[styles.text, { fontFamily: "HappyMonkey_400Regular" }]}>
          Déjeuner,
        </Text>
        <Text style={[styles.text, { fontFamily: "HappyMonkey_400Regular" }]}>
          Rencontrer,
        </Text>
        <Text style={[styles.text, { fontFamily: "HappyMonkey_400Regular" }]}>
          Recommencer...
        </Text>
      </View>
      <View style={styles.view}>
        <Button
          buttonStyle={{
            backgroundColor: "#F9B34C",
            margin: 10,
            width: 250,
            borderRadius: 20,
          }}
          title="Connexion"
          onPress={() => navigation.navigate("Connexion")}
        />

        <Button
          buttonStyle={{
            backgroundColor: "#F9B34C",
            margin: 10,
            width: 250,
            borderRadius: 20,
          }}
          title="Inscription"
          onPress={() => navigation.navigate("Inscription")}
        />
        <Button
          buttonStyle={{
            backgroundColor: "#999",
            margin: 10,
            width: 250,
            borderRadius: 20,
          }}
          // onPress={() => navigation.navigate()}
          icon={
            <FontAwesome name="linkedin-square" size={24} color="#f5f3f4" />
          }
          iconRight
          title="Linkedin (available soon) "
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "#f5f3f4",
    textAlign: "center",
    letterSpacing: 3,
    lineHeight: 35,
  },
  button: {
    color: "#009788",
  },
  logo: {
    width: 160,
    height: 160,
  },
  linkedin: {
    color: "white",
    margin: 20,
  },
  linkedinImage: {
    width: 30,
    height: 30,
  },
});
