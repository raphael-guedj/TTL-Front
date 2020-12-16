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

import { PRIVATE_URL } from "../config";

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
      navigation.navigate("profilTab");
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
            placeholderTextColor="#b2c3cf"
            leftIcon={<Feather name="edit" size={15} color="#c7d3dc" />}
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
            placeholderTextColor="#b2c3cf"
            leftIcon={<Feather name="briefcase" size={15} color="#c7d3dc" />}
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
          placeholderTextColor="#b2c3cf"
          leftIcon={<Feather name="map-pin" size={15} color="#c7d3dc" />}
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
          placeholderTextColor="#b2c3cf"
          leftIcon={<Feather name="plus-circle" size={15} color="#c7d3dc" />}
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
        placeholderTextColor="#b2c3cf"
        leftIcon={<Entypo name="email" size={15} color="#c7d3dc" />}
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
              label: "Agroalimentaire",
              value: "Agroalimentaire",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Activité informatique",
              value: "Activité informatique",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Activité juridique et comptable",
              value: "Activité juridique et comptable",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Art - Culture",
              value: "Art - Culture",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Automobile et aéronautique",
              value: "Automobile et aéronautique",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Banque et Assurances",
              value: "Banque et Assurances",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Bois - Papier - Imprimerie",
              value: "Bois - Papier - Imprimerie",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Chimie",
              value: "Chimie",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Commerce - Négoce - Distribution",
              value: "Commerce - Négoce - Distribution",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Communication et médias",
              value: "Communication et médias",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Conseils et gestion des entreprises",
              value: "Conseils et gestion des entreprises",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Construction",
              value: "Construction",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Développeur web",
              value: "Développeur web",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Energie - Eau",
              value: "Energie - Eau",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Formation",
              value: "Formation",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Graphisme - Design",
              value: "Graphisme - Design",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Hôtellerie - Restauration - Loisirs",
              value: "Hôtellerie - Restauration - Loisirs",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Immobilier",
              value: "Immobilier",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Industrie pharmaceutique",
              value: "Industrie pharmaceutique",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Mécanique - Métallurgie",
              value: "mecanic",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "RH - Rectutement",
              value: "recrutment",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Santé - Medical",
              value: "Santé - Medical",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Télécommunication",
              value: "telecommunication",
              icon: () => (
                <Feather name="briefcase" size={20} color="#418581" />
              ),
            },
            {
              label: "Transport et logistique",
              value: "transport",
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
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Espagnol",
              value: "Espagnol",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Italien",
              value: "Italien",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },

            {
              label: "Français",
              value: "Français",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Mandarin",
              value: "Mandarin",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Hebreu",
              value: "Hebreu",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Arabe",
              value: "Arabe",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Russe",
              value: "Russe",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Portugais",
              value: "Portugais",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
              ),
            },
            {
              label: "Autre",
              value: "Autre",
              icon: () => (
                <MaterialIcons name="language" size={20} color="#418581" />
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
              placeholderTextColor={"#b2c3cf"}
              underlineColorAndroid={"transparent"}
            />
          </InputScrollView>
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 15 }}>
        <Text style={styles.titleStyle}> Mes envies: </Text>
        <CheckBox
          title="Déconnecter du travail"
          onPress={() => setWish5(!wish5)}
          checked={wish5}
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
          title="Rencontrer de nouvelles personnes"
          onPress={() => setWish1(!wish1)}
          checked={wish1}
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
          title="Découvrir le quartier et ses alentours"
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
              label: "Africain",
              value: "Africain",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Arménien",
              value: "Arménien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Asiatique",
              value: "Asiatique",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Cuisine saine",
              value: "Cuisine saine",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Espagnol",
              value: "Espagnol",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Fast food",
              value: "Fast food",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Français",
              value: "Français",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Halal",
              value: "Halal",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Italien",
              value: "Italien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Indien",
              value: "Indien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Libanais",
              value: "Libanais",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Méditérranéen",
              value: "Méditérranéen",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Mexicain",
              value: "Mexicain",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Oriental",
              value: "Oriental",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Pakistanais",
              value: "Pakistanais",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Japonais",
              value: "Japonais",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Tapas",
              value: "Tapas",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Thaï",
              value: "Thaï",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Tunisien",
              value: "Tunisien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Turc",
              value: "Turc",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Vegan",
              value: "Vegan",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Végétarien",
              value: "Végétarien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
                />
              ),
            },
            {
              label: "Vietnamien",
              value: "Vietnamien",
              icon: () => (
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={20}
                  color="#F9B34C"
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
    color: "#eb4d4b",
    fontSize: 15,
    margin: 15,
  },
});

function mapStateToProps(state) {
  // console.log("state", state.user);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(EditProfilScreen);
