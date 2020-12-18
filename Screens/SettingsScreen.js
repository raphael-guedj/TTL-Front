import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Overlay } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { PRIVATE_URL } from "../config";

function SettingsScreen({ setReduxUser, user }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleLogOut = async () => {
    await fetch(`${PRIVATE_URL}/logout?token=${user.token}`);

    AsyncStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };

  const handleDeleteUser = async () => {
    await fetch(`${PRIVATE_URL}/delete-user?id=${user.id}`);

    AsyncStorage.removeItem("userToken");
    setReduxUser({ id: null, pseudo: null, token: null });
  };

  return (
    <View>
      <ScrollView>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <Card.Title style={styles.title}>À propos</Card.Title>
          <Card.Divider />

          <View>
            <Text style={styles.text}>Nous contacter</Text>
            <Text style={styles.text}>Règles d'utilisation</Text>
            <Text style={styles.text}>Qui sommes nous ?</Text>
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
        <View
          style={{
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/Logo_Forky_dark.png")}
            style={styles.logo}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={toggleOverlay}>
            <Text
              style={{
                color: "#eb4d4b",
              }}
            >
              Supprimer mon compte
            </Text>
          </TouchableOpacity>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{
              borderRadius: 5,
              width: "94%",
              height: "25%",
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
              titleStyle={{ color: "#418581" }}
              title="Non, je veux continuer à déjeuner"
              onPress={toggleOverlay}
            />
            <Button
              type="clear"
              titleStyle={{ color: "#eb4d4b", fontSize: 14 }}
              title="Oui, j'ai pris ma décision"
              onPress={() => handleDeleteUser()}
            />
          </Overlay>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleModal: {
    fontSize: 15,
    color: "#0b090a",
    textAlign: "center",
    marginVertical: 10,
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
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#418581",
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
  return { user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
