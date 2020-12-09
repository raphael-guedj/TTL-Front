import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        margin: 30,
      }}
    >
      <Feather
        style={styles.settings}
        name="settings"
        size={28}
        color="#F9B34C"
        onPress={() => navigation.navigate("Reglage")}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <View style={styles.avatar}>
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />

          <Card.Title style={styles.title1}>Profil</Card.Title>

          <Text>
            <Text style={styles.title2}> Prénom: </Text>
            <Text style={styles.text}> Paul</Text>
          </Text>
          <Text>
            <Text style={styles.title2}> Ville: </Text>
            <Text style={styles.text}> Marseille</Text>
          </Text>
          <Text>
            <Text style={styles.title2}> Profession: </Text>
            <Text style={styles.text}>Développeur web </Text>
          </Text>
        </View>

        <View>
          <Button
            buttonStyle={{
              backgroundColor: "#F9B34C",
              margin: 10,
              width: 250,
              borderRadius: 20,
              alignSelf: "center",
            }}
            title="Modifier mon profil"
            onPress={() => navigation.navigate("LandingScreen")}
          />
          <Button
            buttonStyle={{
              backgroundColor: "#F9B34C",
              margin: 10,
              width: 250,
              borderRadius: 20,
              alignSelf: "center",
            }}
            title="Mes lunchs"
            onPress={() => navigation.navigate("LandingScreen")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000a0",
  },

  container: {
    justifyContent: "space-around",
  },
  title1: {
    fontSize: 20,
    color: "#F9B34C",
    margin: 10,
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },

  text: {
    fontSize: 15,
    color: "black",
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
  },

  button: {
    color: "#009788",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F9B34C",
    borderRadius: 30,
    padding: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  settings: {
    margin: 20,
  },
  space: {
    justifyContent: "space-around",
  },
});

export default ProfileScreen;
