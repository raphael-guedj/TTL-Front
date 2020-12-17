import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { PRIVATE_URL } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

function ProfileScreen({ navigation, userState }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/getmydata?id=${userState.id}`
      );
      let response = await rawResponse.json();
      console.log(response);
      response.myUser.name && setName(response.myUser.name);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <View style={styles.avatar}>
            <Image
              style={styles.image}
              source={
                photo ? { uri: photo } : require("../assets/default_avatar.jpg")
              }
            />

            <Card.Title style={styles.title1}>Profil</Card.Title>

            <Text>
              <Feather name="edit" size={16} color="#F9B34C" />
              <Text style={styles.title2}> Prénom: </Text>
              <Text style={styles.text}>
                {name != "" ? name : "Non renseigné"}
              </Text>
            </Text>
            <Text>
              <Feather name="map-pin" size={16} color="#F9B34C" />
              <Text style={styles.title2}> Ville: </Text>
              <Text style={styles.text}>
                {city != "" ? city : "Non renseigné"}
              </Text>
            </Text>
            <Text>
              <Feather name="briefcase" size={16} color="#F9B34C" />
              <Text style={styles.title2}> Profession: </Text>
              <Text style={styles.text}>
                {job != "" ? job : "Non renseigné"}
              </Text>
            </Text>
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
            onPress={() => navigation.navigate("Modifier mon profil")}
          />
          <Button
            buttonStyle={{
              backgroundColor: "#F9B34C",
              margin: 10,
              width: 250,
              borderRadius: 20,
              alignSelf: "center",
            }}
            title="Mes Forkys"
            onPress={() => navigation.navigate("Mes Forkys")}
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
    color: "#418581",
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
    // borderWidth: 1,
    // borderColor: "#418581",
    // borderRadius: 30,
    padding: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#d9eceb",
  },
  settings: {
    margin: 10,
  },
  settingsText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
  },
  space: {
    justifyContent: "space-around",
  },
});

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(ProfileScreen);
