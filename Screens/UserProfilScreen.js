import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { Button, CheckBox, Card } from "react-native-elements";

import { PRIVATE_URL } from "../App";

function UserProfilScreen({ navigation, userState, route }) {
  const [language, setLanguage] = useState(true);
  const [food, setFood] = useState([]);

  const handleinvit = async () => {
    let rawResponse = await fetch(
      `${PRIVATE_URL}/mydataprofile?id=${userState.id}`
    );
    let response = await rawResponse.json();
    if (response.result) {
      navigation.navigate("Invitation", route);
    } else {
      navigation.navigate("Modifier le profil");
    }
    console.log(response);
  };

  console.log(route);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
        <View style={styles.avatar}>
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />
          <View style={{ width: "70%" }}>
            <View style={styles.containerArea}>
              <Text style={styles.title1}> Prénom: </Text>
              <Text style={styles.text}> {route.params.name}</Text>
            </View>
            <View style={styles.containerArea}>
              <Text style={styles.title1}> Profession: </Text>
              <Text style={styles.text}> {route.params.profession}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: "40%", flexDirection: "row" }}>
          <View style={styles.rowArea}>
            <Text style={styles.title1}> Ville: </Text>
            <Text style={styles.text}> {route.params.city}</Text>
          </View>
          <View style={styles.containerArea}>
            <Text style={styles.title1}> Arr: </Text>
            <Text style={styles.text}> {route.params.arrondissement}</Text>
          </View>
        </View>
        <View style={styles.containerArea}>
          <Text style={styles.title1}> Email: </Text>
          <Text style={styles.text}> {route.params.email}</Text>
        </View>

        <View style={styles.containerArea}>
          <Text style={styles.title1}> Secteur d'activité: </Text>
          <Text style={styles.text}> {route.params.secteur}</Text>
        </View>
      </Card>
      <View>
        <Text style={styles.title2}> Langue(s) parlée(s): </Text>
        {route.params.language.map((lang, i) => (
          <CheckBox
            key={i}
            title={lang}
            checked={true}
            checkedColor="#F9B34C"
            size={20}
            textStyle={{ fontWeight: "normal" }}
            containerStyle={{
              marginLeft: 14,
              marginRight: 14,
              borderRadius: 5,
              borderColor: "#abd6d3",
            }}
          />
        ))}
      </View>

      <View>
        <Text style={styles.title2}> Mes envies: </Text>
        <CheckBox
          title="Rencontrer de nouvelles personnes"
          checked={route.params.wish1 ? true : false}
          checkedColor="#F9B34C"
          size={20}
          textStyle={{ fontWeight: "normal" }}
          containerStyle={{
            marginLeft: 14,
            marginRight: 14,
            borderRadius: 5,
            borderColor: "#abd6d3",
          }}
        />
        <CheckBox
          title="En reconversion professionnelle"
          checked={route.params.wish2 ? true : false}
          checkedColor="#F9B34C"
          size={20}
          textStyle={{ fontWeight: "normal" }}
          containerStyle={{
            marginLeft: 14,
            marginRight: 14,
            borderRadius: 5,
            borderColor: "#abd6d3",
          }}
        />
        <CheckBox
          title="Recherche d'opportunités professionnelles"
          checked={route.params.wish3 ? true : false}
          checkedColor="#F9B34C"
          size={20}
          textStyle={{ fontWeight: "normal" }}
          containerStyle={{
            marginLeft: 14,
            marginRight: 14,
            borderRadius: 5,
            borderColor: "#abd6d3",
          }}
        />
        <CheckBox
          title="Sortir du bureau"
          checked={route.params.wish4 ? true : false}
          checkedColor="#F9B34C"
          size={20}
          textStyle={{ fontWeight: "normal" }}
          containerStyle={{
            marginLeft: 14,
            marginRight: 14,
            borderRadius: 5,
            borderColor: "#abd6d3",
          }}
        />
      </View>

      <Text style={styles.title2}> À propos: </Text>

      <View style={styles.textareaContainer}>
        <Text style={styles.about}>{route.params.description}</Text>
      </View>

      <View>
        <Text style={styles.title2}> Cuisine(s) favorite(s): </Text>
        {route.params.food.map((food, i) => (
          <CheckBox
            key={i}
            title={food}
            checked={true}
            checkedColor="#F9B34C"
            size={20}
            textStyle={{ fontWeight: "normal" }}
            containerStyle={{
              marginLeft: 14,
              marginRight: 14,
              borderRadius: 5,
              borderColor: "#abd6d3",
              marginLeft: 10,
            }}
          />
        ))}
      </View>

      <View>
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
            margin: 20,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          title="Envoyer une invitation"
          onPress={() => handleinvit()}
        />
        <Button
          buttonStyle={{
            backgroundColor: "#F9B34C",
            marginBottom: 30,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          title="Retour à l'accueil"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title1: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
  },
  title2: {
    fontSize: 15,
    marginLeft: 15,
    marginTop: 10,
    fontWeight: "bold",
    color: "black",
  },

  text: {
    fontSize: 15,
    color: "black",
    justifyContent: "center",
    alignSelf: "center",
  },
  about: {
    fontSize: 12,
    color: "black",
  },

  container: {
    padding: 10,
    flex: 0.9,
  },
  avatar: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fbc87d",
  },
  textareaContainer: {
    height: 130,
    width: "95%",
    padding: 5,
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#abd6d3",
    borderRadius: 5,
  },
  textarea: {
    textAlignVertical: "top",
    height: 170,
    fontSize: 14,
    color: "#333",
  },
  containerArea: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  rowArea: {
    width: "95%",
    paddingVertical: 8,
    flexDirection: "row",
    marginLeft: 10,
  },
});

function mapStateToProps(state) {
  console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(UserProfilScreen);
