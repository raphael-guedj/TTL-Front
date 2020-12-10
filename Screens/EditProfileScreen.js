import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory, Input } from "react-native-elements";
import { connect } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import Textarea from "react-native-textarea";

import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfilScreen = ({ navigation, userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [language, setLanguage] = useState([]);
  const [food, setFood] = useState([]);
  const [envies, setEnvies] = useState([]);
  const [text, setText] = useState("");
  const [emptyProfil, setEmptyProfil] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(
        `http://172.16.0.21:3000/getmydata?id=${userState.id}`
      );
      let response = await rawResponse.json();
      console.log(response);
      setName(response.myUser.name);
      setEmail(response.myUser.email);
      setJob(response.myUser.profession);
      setJob(response.myUser.profession);
      setCity(response.myUser.city);
      setPostcode(response.myUser.arrondissement);
      setText(response.myUser.description);
      setActivity(response.myUser.secteur);
      // setLanguage(response.myUser.language);
      // setFood(response.myUser.cuisines);
    };
    getUser();
  }, []);

  const handleSignUp = async () => {
    let rawResponse = await fetch(`http://172.16.0.21:3000/recordmydata`, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&email=${email}&job=${job}&city=${city}&postcode=${postcode}&activity=${activity}&language=${language}&envies=${envies}&text=${text}&food=${food}&id=${userState.id}`,
    });

    let response = await rawResponse.json();
    console.log(response);
    if (
      name !== "" &&
      job !== "" &&
      email !== "" &&
      city !== "" &&
      postcode !== "" &&
      activity !== "" &&
      language !== "" &&
      text !== "" &&
      food !== ""
    ) {
      setEmptyProfil(false);
      navigation.navigate("Profil");
    } else {
      setEmptyProfil(true);
    }
  };

  useEffect(() => {
    console.log(activity);
  }, [activity]);

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
            label: "Banque / Assurance / Finance",
            value: "bank",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Commerce / Négoce / Distribution",
            value: "business",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Art / Culture",
            value: "art",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Santé / Medical / Docteur",
            value: "sante",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Immobilier / Notariat",
            value: "asset",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Transport / Logistique",
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
            label: "Informatique / Digital",
            value: "it",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
          {
            label: "Autre",
            value: "other",
            icon: () => <Feather name="briefcase" size={20} color="#418581" />,
          },
        ]}
        placeholder={"Choisir un secteur d'activité"}
        defaultValue={activity}
        dropDownMaxHeight={200}
        style={{
          width: "100%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        containerStyle={{ height: 40, margin: 10 }}
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
            label: "Espagnol",
            value: "es",
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
            label: "Français",
            value: "fr",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Mandarin",
            value: "ch",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Hebreu",
            value: "is",
            icon: () => (
              <MaterialIcons name="language" size={24} color="#418581" />
            ),
          },
          {
            label: "Arabe",
            value: "ar",
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
            label: "Portugais",
            value: "pt",
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
        ]}
        multiple={true}
        multipleText="%d langue(s) parlée(s)"
        min={0}
        max={10}
        placeholder={"Choisir une ou plusieurs langue(s) (3 max)"}
        defaultValue={language}
        dropDownMaxHeight={200}
        style={{
          width: "95%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        arrowStyle={{ marginRight: 10 }}
        onChangeItem={
          (item) => setLanguage(item) // an array of the selected items
        }
      />
      <View style={styles.container}>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={(e) => setText(e)}
          defaultValue={text}
          maxLength={300}
          minLength={80}
          placeholder={"A propos de vous (80 caractères min)"}
          placeholderTextColor={"#606770"}
          underlineColorAndroid={"transparent"}
        />
      </View>
      <DropDownPicker
        items={[
          {
            label: "Thai",
            value: "thai",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
          {
            label: "Italien",
            value: "italian",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
          {
            label: "Chinois",
            value: "china",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
          {
            label: "Americain",
            value: "burger",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
          {
            label: "Japonais",
            value: "jap",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
          {
            label: "Autre",
            value: "other",
            icon: () => (
              <MaterialCommunityIcons
                name="silverware-fork"
                size={24}
                color="#418581"
              />
            ),
          },
        ]}
        multiple={true}
        multipleText="%d mes cuisine(s) préférée(s)"
        min={0}
        max={10}
        placeholder={"Choisir un ou plusieurs type(s) de cuisine(s)"}
        defaultValue={food}
        dropDownMaxHeight={200}
        style={{
          width: "95%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        containerStyle={{ height: 40 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        arrowStyle={{ marginRight: 10 }}
        onChangeItem={
          (item) => setFood(item) // an array of the selected items
        }
      />

      <View>
        {emptyProfil && (
          <Text style={styles.emptyText}>
            L'un des champs du profil est vide, re-vérifiez avant d'enregistrer
          </Text>
        )}
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
            margin: 20,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          title="Enregistrer"
          onPress={() => handleSignUp()}
        />
      </View>
    </ScrollView>
  );
};

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
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#949494",
    borderRadius: 5,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#d90429",
    fontStyle: "italic",
    fontSize: 15,
  },
});

function mapStateToProps(state) {
  console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(EditProfilScreen);
