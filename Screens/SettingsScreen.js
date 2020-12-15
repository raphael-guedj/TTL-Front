import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Overlay } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { PRIVATE_URL } from "../App";

function SettingsScreen({ navigation, setReduxUser, userToken, userID }) {
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [visible, setVisible] = useState(false);

  const handleLogOut = async () => {
    await fetch(`${PRIVATE_URL}/logout?token=${userToken}`);

    AsyncStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };

  const handleDeleteUser = async () => {
    await fetch(`${PRIVATE_URL}/delete-user?id=${userID}`);

    AsyncStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };

  return (
    <View style={styles.card}>
      <ScrollView>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <Card.Title style={styles.title}>À propos</Card.Title>
          <Card.Divider />

          <View>
            <Text style={styles.text}>Nous contacter</Text>
            <Text style={styles.text}>Qui sommes nous ?</Text>
            <Text style={styles.text}>Règles d'utilisation</Text>
          </View>
        </Card>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <Card.Title style={styles.title}>Mentions légales</Card.Title>
          <Card.Divider />

          <View>
            <Text style={styles.text}>Préférences de confidentialité</Text>
            <Text style={styles.text}>Politique de confidentialité</Text>
            <Text style={styles.text}>Conditions d'utilisation</Text>
          </View>
        </Card>

        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <View>
            <Button
              type="clear"
              titleStyle={{ color: "black" }}
              title="Déconnexion"
              onPress={() => handleLogOut()}
            />
          </View>
        </Card>
        <Image
          source={require("../assets/Logo_Forky_dark.png")}
          style={styles.logo}
        ></Image>
        <Card
          containerStyle={{
            borderRadius: 5,
            borderColor: "#ed8764",
            marginBottom: 20,
          }}
        >
          <View>
            <Button
              type="clear"
              titleStyle={{ color: "#eb4d4b" }}
              title="Supprimer mon compte"
              onPress={toggleOverlay}
            />
            <Overlay
              isVisible={visible}
              onBackdropPress={toggleOverlay}
              overlayStyle={{
                borderRadius: 5,
                width: "80%",
                height: "20%",
                justifyContent: "space-between",
                borderWidth: 1,
                borderColor: "#418581",
              }}
            >
              <Text style={styles.titleModal}>
                Êtes-vous sur de vouloir supprimer votre compte ?
              </Text>
              <Button
                type="clear"
                titleStyle={{ color: "#eb4d4b" }}
                title="Supprimer mon compte"
                onPress={() => handleDeleteUser()}
              />
            </Overlay>
          </View>
        </Card>
      </ScrollView>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1faee",
  },
  titleModal: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    color: "black",
    justifyContent: "center",
    margin: 5,
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
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#418581",
  },
  card: {
    marginTop: 0,
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

function mapStateToProps(state) {
  return { userToken: state.user.token, userID: state.user.id };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
