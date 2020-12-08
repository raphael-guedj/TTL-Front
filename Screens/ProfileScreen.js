import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <Button
        onPress={() => navigation.navigate("Reglage")}
        icon={
          <Feather
            style={styles.settings}
            name="settings"
            size={28}
            color="#418581"
          />
        }
        type="outline"
        buttonStyle={{
          backgroundColor: "#ffffff",
          width: 90,
          height: 60,
          margin: 20,
        }}
      ></Button>

      <Card containerStyle={styles.container}>
        <View style={styles.row}>
          <View>
            <Avatar
              size="xlarge"
              rounded
              // source={require("../assets/profile.jpg")}
              source={{
                uri:
                  "https://www.polymtl.ca/calendrier/sites/calendrier.amigow2020.polymtl.ca/files/googlelogo.jpg",
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            >
              {/* <Accessory /> */}
            </Avatar>
          </View>

          <View>
            <Text style={styles.text}>Prénom: Kevin</Text>
            <Text style={styles.text}>Ville: Marseille </Text>
            <Text style={styles.text}>Profession: Développeur</Text>
          </View>
        </View>
      </Card>

      <View>
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
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
            backgroundColor: "#418581",
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
    height: "40%",
  },
  // title:{
  //   fontSize:
  // },
  text: {
    fontSize: 20,
    color: "black",
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    color: "#009788",
  },
  logo: {
    width: 120,
    height: 120,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },

  avatar: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  row: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  settings: {
    margin: 20,
  },
});

export default ProfileScreen;
