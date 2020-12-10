import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Button, CheckBox } from "react-native-elements";

function UserProfilScreen({ navigation }) {
  const [language, setLanguage] = useState(true);
  const [food, setFood] = useState([]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.avatar}>
        <Image style={styles.image} source={require("../assets/profile.jpg")} />
        <View style={{ width: "70%" }}>
          <View style={styles.containerArea}>
            <Text style={styles.title2}> Prénom: </Text>
            <Text style={styles.text}> John</Text>
          </View>
          <View style={styles.containerArea}>
            <Text style={styles.title2}> Profession: </Text>
            <Text style={styles.text}> Architecte</Text>
          </View>
        </View>
      </View>
      <View style={{ width: "45%", flexDirection: "row" }}>
        <View style={styles.rowArea}>
          <Text style={styles.title2}> Ville: </Text>
          <Text style={styles.text}> Marseille</Text>
        </View>
        <View style={styles.containerArea}>
          <Text style={styles.title2}> Arrondissement: </Text>
          <Text style={styles.text}> 13008</Text>
        </View>
      </View>
      <View style={styles.containerArea}>
        <Text style={styles.title2}> Email: </Text>
        <Text style={styles.text}> john.architecte@gmail.com</Text>
      </View>

      <View style={styles.containerArea}>
        <Text style={styles.title2}> Secteur d'activité: </Text>
        <Text style={styles.text}> Architecture/Urbanisme</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={styles.title2}> Langue(s) parlée(s): </Text>
        <CheckBox
          title="Français"
          checked={true}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Anglais"
          checked={false}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Italien"
          checked={false}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
      </View>

      <View style={{ margin: 10 }}>
        <Text style={styles.title2}> Mes envies: </Text>
        <CheckBox
          title="Rencontrer de nouvelles personnes"
          checked={true}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="En reconversion professionnelle"
          checked={false}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Recherche d'opportunités professionnelles"
          checked={true}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Sortir du bureau"
          checked={false}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
      </View>

      <View style={styles.textareaContainer}>
        <Text style={styles.about}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters. Lorem Ipsum is dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </Text>
      </View>

      <View style={{ margin: 10 }}>
        <Text style={styles.title2}> Cuisine(s) favorite(s): </Text>
        <CheckBox
          title="Thaï"
          checked={true}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Italien"
          checked={false}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Méditéranéen"
          checked={true}
          checkedColor="#418581"
          size={20}
          textStyle={{ fontWeight: "normal" }}
        />
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
          onPress={() => navigation.navigate("")}
        />
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
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
    fontSize: 20,
    color: "#418581",
    margin: 10,
  },
  title2: {
    fontSize: 15,
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
  },
  textareaContainer: {
    height: 130,
    width: "95%",
    padding: 5,
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#949494",
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

export default UserProfilScreen;
