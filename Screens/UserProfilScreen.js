import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { Button, CheckBox, Card, Badge } from "react-native-elements";

import { Feather } from "@expo/vector-icons";

import { PRIVATE_URL } from "../config";

function UserProfilScreen({ navigation, userState, route }) {
  const handleinvit = async () => {
    let rawResponse = await fetch(
      `${PRIVATE_URL}/mydataprofile?id=${userState.id}`
    );
    let response = await rawResponse.json();
    if (response.result) {
      navigation.navigate("Envoyer une invitation", route);
    } else {
      navigation.navigate("Modifier mon profil");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <Card
        containerStyle={{
          borderRadius: 5,
          borderColor: "#abd6d3",
          marginTop: 30,
          padding: 0,
        }}
      >
        <View style={styles.avatar}>
          <Image style={styles.image} source={{ uri: route.params.photo }} />
          <Badge
            status={route.params.isConnected ? "success" : "error"}
            containerStyle={{
              position: "absolute",
              top: 10,
              left: 17,
            }}
          />
          <View style={{ width: "75%" }}>
            <View style={styles.containerArea}>
              <Text>
                <Feather name="edit" size={16} color="#F9B34C" />

                <Text style={styles.text}> {route.params.name}</Text>
              </Text>
            </View>
            <View style={styles.containerArea}>
              <Text>
                <Feather name="briefcase" size={16} color="#F9B34C" />

                <Text style={styles.text}> {route.params.profession}</Text>
              </Text>
            </View>
            <View style={styles.rowArea}>
              <Text>
                <Feather name="map-pin" size={16} color="#F9B34C" />

                <Text style={styles.text}>
                  {" "}
                  {route.params.city} {" - "}
                  {route.params.arrondissement}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <View style={styles.margin}>
        <Text style={styles.title2}> Langue(s) parlée(s): </Text>
        {route.params.language.map((lang, i) => (
          <CheckBox
            key={i}
            title={lang}
            checked={true}
            checkedColor="#F9B34C"
            size={18}
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
        {route.params.wish1 && (
          <CheckBox
            title="Rencontrer de nouvelles personnes"
            checked={true}
            checkedColor="#F9B34C"
            size={18}
            textStyle={{ fontWeight: "normal" }}
            containerStyle={{
              marginLeft: 14,
              marginRight: 14,
              borderRadius: 5,
              borderColor: "#abd6d3",
            }}
          />
        )}
        {route.params.wish2 && (
          <CheckBox
            title="Découvrir un nouveau métier"
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
        )}
        {route.params.wish3 && (
          <CheckBox
            title="Recherche d'opportunités professionnelles"
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
        )}
        {route.params.wish4 && (
          <CheckBox
            title="Se reconvertir professionnellement"
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
        )}
        {route.params.wish5 && (
          <CheckBox
            title="Déconnecter du travail"
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
        )}
        {route.params.wish6 && (
          <CheckBox
            title="Découvrir le quartier et ses alentours"
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
        )}
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
    marginTop: 30,
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
    borderWidth: 1.5,
    borderColor: "#d9eceb",
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
    paddingVertical: 3,
    paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rowArea: {
    width: "100%",
    paddingVertical: 3,
    flexDirection: "row",
    marginLeft: 5,
  },
});

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(UserProfilScreen);
