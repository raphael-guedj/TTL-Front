import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import Textarea from "react-native-textarea";
import InputScrollView from "react-native-input-scroll-view";

import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { PRIVATE_URL } from "../App";

const EditProfilScreen = ({ navigation, userState }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [language, setLanguage] = useState([]);
  const [food, setFood] = useState([]);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");
  const [wish1, setWish1] = useState(false);
  const [wish2, setWish2] = useState(false);
  const [wish3, setWish3] = useState(false);
  const [wish4, setWish4] = useState(false);
  const [wish5, setWish5] = useState(false);
  const [wish6, setWish6] = useState(false);
  const [emptyProfil, setEmptyProfil] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/getmydata?id=${userState.id}`
      );
      let response = await rawResponse.json();
      console.log(response);
      response.myUser.name && setName(response.myUser.name);
      response.myUser.email && setEmail(response.myUser.email);
      response.myUser.profession && setJob(response.myUser.profession);
      response.myUser.city && setCity(response.myUser.city);
      response.myUser.arrondissement &&
        setPostcode(response.myUser.arrondissement);
      response.myUser.description && setText(response.myUser.description);
      response.myUser.secteur && setActivity(response.myUser.secteur);
      response.myUser.wish1 && setWish1(response.myUser.wish1);
      response.myUser.wish2 && setWish2(response.myUser.wish2);
      response.myUser.wish3 && setWish3(response.myUser.wish3);
      response.myUser.wish4 && setWish4(response.myUser.wish4);
      response.myUser.wish5 && setWish5(response.myUser.wish5);
      response.myUser.wish6 && setWish6(response.myUser.wish6);
      response.myUser.language && setLanguage(response.myUser.language);
      response.myUser.food && setFood(response.myUser.food);
      response.myUser.photo && setPhoto(response.myUser.photo);
    };
    getUser();
  }, [isFocused]);

  const handleRecord = async () => {
    if (
      name !== "" &&
      job !== "" &&
      email !== "" &&
      city !== "" &&
      postcode !== "" &&
      activity !== "" &&
      language.length !== 0 &&
      text !== "" &&
      food.length !== 0 &&
      photo !== "" &&
      (wish1 || wish2 || wish3 || wish4 || wish5 || wish6)
    ) {
      let rawResponse = await fetch(`${PRIVATE_URL}/recordmydata`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&email=${email}&job=${job}&city=${city}&postcode=${postcode}&activity=${activity}&language=${JSON.stringify(
          language
        )}&text=${text}&food=${JSON.stringify(
          food
        )}&wish1=${wish1}&wish2=${wish2}&wish3=${wish3}&wish4=${wish4}&wish5=${wish5}&wish6=${wish6}&id=${
          userState.id
        }`,
      });

      let response = await rawResponse.json();
      console.log(response);

      setEmptyProfil(false);
      navigation.navigate("Profil");
    } else {
      setEmptyProfil(true);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View style={styles.avatar}>
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          {!photo ? (
            <Ionicons
              style={styles.camera}
              name="ios-camera"
              size={85}
              color="#418581"
            />
          ) : (
            <Image style={styles.image} source={{ uri: photo }} />
          )}
        </TouchableOpacity>
        <View style={{ width: "70%" }}>
          <Input
            placeholder="Prénom"
            onChangeText={(e) => setName(e)}
            value={name}
            placeholderTextColor="#606770"
            leftIcon={<Feather name="edit" size={20} color="#c7d3dc" />}
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
            leftIcon={<Feather name="briefcase" size={20} color="#c7d3dc" />}
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
          leftIcon={<Feather name="map-pin" size={20} color="#c7d3dc" />}
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
          leftIcon={<Feather name="plus-circle" size={20} color="#c7d3dc" />}
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
        leftIcon={<Entypo name="email" size={19} color="#c7d3dc" />}
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
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> Mon secteur d'activité: </Text>

        <DropDownPicker
          items={[
            {
              label: "Banque / Assurance / Finance",
              value: "bank",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Commerce / Négoce / Distribution",
              value: "business",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Art / Culture",
              value: "art",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Santé / Medical / Docteur",
              value: "sante",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Immobilier / Notariat",
              value: "asset",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Transport / Logistique",
              value: "transport",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Batiment",
              value: "builder",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Édition / Communication / Multimédia",
              value: "multimedia",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Informatique / Digital",
              value: "it",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Autre",
              value: "other",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
          ]}
          placeholder={"Choisir un secteur d'activité"}
          defaultValue={activity}
          dropDownMaxHeight={130}
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
            (item) => setActivity(item.value) // an array of the selected items
          }
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> Mes langues parlées: </Text>
        <DropDownPicker
          items={[
            {
              label: "Anglais",
              value: "Anglais",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Espagnol",
              value: "Espagnol",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Italien",
              value: "Italien",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },

            {
              label: "Français",
              value: "Français",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Mandarin",
              value: "Mandarin",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Hebreu",
              value: "Hebreu",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Arabe",
              value: "Arabe",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Russe",
              value: "Russe",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Portugais",
              value: "Portugais",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
            {
              label: "Autre",
              value: "Autre",
              icon: () => (
                <MaterialIcons name="language" size={24} color="#418581" />
              ),
            },
          ]}
          multiple={true}
          multipleText="%d langue(s) sélectionnée(s)"
          min={0}
          max={3}
          placeholder={"Choisir une ou plusieurs langue(s)"}
          defaultValue={language}
          dropDownMaxHeight={130}
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
            (item) => setLanguage(item) // an array of the selected items
          }
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> A propos de moi: </Text>
        <View style={styles.container}>
          <InputScrollView>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={(e) => setText(e)}
              defaultValue={text}
              maxLength={300}
              minLength={80}
              placeholder={"Décrivez-vous ici..."}
              placeholderTextColor={"#606770"}
              underlineColorAndroid={"transparent"}
            />
          </InputScrollView>
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> Mes envies: </Text>
        <CheckBox
          title="Rencontrer de nouvelles personnes"
          onPress={() => setWish1(!wish1)}
          checked={wish1}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Découvrir un nouveau métier"
          onPress={() => setWish2(!wish2)}
          checked={wish2}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Recherche d'opportunités professionnelles"
          onPress={() => setWish3(!wish3)}
          checked={wish3}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Se reconvertir professionnellement"
          onPress={() => setWish4(!wish4)}
          checked={wish4}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Se déconnecter du bureau"
          onPress={() => setWish5(!wish5)}
          checked={wish5}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
        <CheckBox
          title="Découvrir le quartier autour de moi"
          onPress={() => setWish6(!wish6)}
          checked={wish6}
          checkedColor="#418581"
          size={14}
          textStyle={{ fontWeight: "normal" }}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> Mes cuisines favorites: </Text>
        <DropDownPicker
          items={[
            {
              label: "Thaï",
              value: "Thaï",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
            {
              label: "Italien",
              value: "Italien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
            {
              label: "Chinois",
              value: "Chinois",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
            {
              label: "Americain",
              value: "Americain",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
            {
              label: "Japonais",
              value: "Japonais",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
            {
              label: "Autre",
              value: "Autre",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork"
                  size={20}
                  color="#418581"
                />
              ),
            },
          ]}
          multiple={true}
          multipleText="%d cuisine(s) préférée(s)"
          min={0}
          max={3}
          placeholder={"Choisir un ou plusieurs type(s) de cuisine(s)"}
          defaultValue={food}
          dropDownMaxHeight={130}
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
      </View>

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
            marginTop: 40,
          }}
          title="Enregistrer"
          onPress={() => handleRecord()}
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
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
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
    borderColor: "#d9eceb",
  },
  camera: {
    paddingHorizontal: 20,
  },
  textareaContainer: {
    height: 130,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#949494",
    borderRadius: 5,
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 12,
    color: "#333",
  },
  rowArea: {
    width: "95%",
    paddingVertical: 8,
    flexDirection: "row",
    marginLeft: 10,
  },
  titleStyle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  emptyText: {
    textAlign: "center",
    color: "#d90429",
    fontStyle: "italic",
    fontSize: 15,
    marginTop: 15,
  },
});

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(EditProfilScreen);
