import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button } from "react-native-elements";

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.card}>
      <ScrollView style={{ marginTop: 15 }}>
        <Card>
          <Card.Title style={styles.title}>Mentions légales</Card.Title>
          <Card.Divider />

          <View>
            <Text style={styles.text}>Préférences de confidentialité</Text>
            <Text style={styles.text}>Politique de confidentialité</Text>
            <Text style={styles.text}>Conditions d'utilisation</Text>
          </View>
        </Card>

        <Card>
          <Card.Title style={styles.title}>À propos</Card.Title>
          <Card.Divider />

          <View>
            <Text style={styles.text}>Nous contacter</Text>
            <Text style={styles.text}>Qui sommes nous ?</Text>
            <Text style={styles.text}>Règles d'utilisation</Text>
          </View>
        </Card>

        <Card>
          <View>
            <Button
              type="clear"
              titleStyle={{ color: "black" }}
              title="Déconnexion"
              onPress={() => navigation.navigate("LandingScreen")}
            />
          </View>
        </Card>
        <Image
          source={require("../assets/Logo_Forky_dark.png")}
          style={styles.logo}
        ></Image>
        <Card>
          <View>
            <Button
              type="clear"
              titleStyle={{ color: "#eb4d4b" }}
              title="Supprimer mon compte"
              onPress={() => navigation.navigate("LandingScreen")}
            />
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
  text: {
    fontSize: 15,
    color: "black",
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
    marginTop: 40,
  },
});

export default SettingsScreen;