import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory, Input } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState([]);
  const [language, setLanguage] = useState([]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.avatar}>
        <Image style={styles.image} source={require("../assets/profile.jpg")} />
        <View style={{ width: "70%" }}>
          <Input
            placeholder="Prénom"
            onChangeText={(e) => setName(e)}
            value={name}
            placeholderTextColor="#606770"
            leftIcon={<Feather name="edit" size={20} color="black" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "black",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "black",
            }}
          />
          <Input
            placeholder="Profession"
            onChangeText={(e) => setJob(e)}
            value={job}
            placeholderTextColor="#606770"
            leftIcon={<Feather name="briefcase" size={20} color="black" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "black",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "black",
            }}
          />
        </View>
      </View>
      <View style={{ width: "50%", flexDirection: "row" }}>
        <Input
          placeholder="Ville"
          onChangeText={(e) => setCity(e)}
          value={city}
          placeholderTextColor="#606770"
          leftIcon={<Feather name="map-pin" size={20} color="black" />}
          leftIconContainerStyle={{
            marginHorizontal: 5,
          }}
          inputStyle={{
            color: "black",
            fontSize: 15,
            fontFamily: "Roboto_400Regular",
          }}
          inputContainerStyle={{
            borderBottomColor: "black",
          }}
        />
        <Input
          placeholder="Arrondissement"
          onChangeText={(e) => setPostcode(e)}
          value={postcode}
          placeholderTextColor="#606770"
          leftIcon={<Feather name="plus-circle" size={20} color="black" />}
          leftIconContainerStyle={{
            marginHorizontal: 5,
          }}
          inputStyle={{
            color: "black",
            fontSize: 15,
            fontFamily: "Roboto_400Regular",
          }}
          inputContainerStyle={{
            borderBottomColor: "black",
          }}
        />
      </View>
      <Input
        placeholder="Email"
        onChangeText={(e) => setEmail(e)}
        value={email}
        placeholderTextColor="#606770"
        leftIcon={<Entypo name="email" size={19} color="black" />}
        leftIconContainerStyle={{
          marginHorizontal: 5,
        }}
        inputStyle={{
          color: "black",
          fontSize: 15,
          fontFamily: "Roboto_400Regular",
        }}
        inputContainerStyle={{
          borderBottomColor: "black",
        }}
      />
      {/* </View> */}

      <DropDownPicker
        items={[
          {
            label: "Banque / Assurance",
            value: "bank",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Commerce / Négoce / Distribution",
            value: "business",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Transports / Logistique",
            value: "transport",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Batiment",
            value: "builder",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Édition / Communication / Multimédia",
            value: "multimedia",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Autre",
            value: "other",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
        ]}
        multiple={true}
        multipleText="%d secteur(s) d'activité séléctionné(s)"
        min={0}
        max={10}
        placeholder={"Choisir un ou plusieurs secteur(s) d'activité"}
        defaultValue={activity}
        dropDownMaxHeight={200}
        style={{ paddingVertical: 10 }}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        arrowStyle={{ marginRight: 10 }}
        onChangeItem={
          (item) => setActivity(item) // an array of the selected items
        }
      />
      <DropDownPicker
        items={[
          {
            label: "Anglais",
            value: "uk",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Italien",
            value: "it",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Espagnol",
            value: "es",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Russe",
            value: "ru",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Autre",
            value: "other",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Français",
            value: "fr",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
        ]}
        multiple={true}
        multipleText="%d langue(s) parlée(s)"
        min={0}
        max={10}
        placeholder={"Choisir une ou plusieurs langue(s)"}
        defaultValue={language}
        dropDownMaxHeight={200}
        style={{ paddingVertical: 10 }}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        arrowStyle={{ marginRight: 10 }}
        onChangeItem={
          (item) => setLanguage(item) // an array of the selected items
        }
      />

      <View>
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
            margin: 10,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          title="Enregistrer"
          onPress={() => navigation.navigate("Enregistrer")}
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

  container: {
    padding: 10,
    flex: 0.9,
  },
  avatar: {
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});

export default EditProfileScreen;
