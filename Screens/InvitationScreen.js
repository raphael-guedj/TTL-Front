import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  ListItem,
  Card,
  Badge,
  Slider,
  Button,
  Input,
} from "react-native-elements";
import Textarea from "react-native-textarea";

import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { PRIVATE_URL } from "../config";

const InvitationScreen = ({ navigation, route, userState }) => {
  // ======= State that keep value of message in textarea ======= //
  const [inputMessage, setInputMessage] = useState("");

  // ======= State that keep value of duration in slider ======= //
  const [duration, setDuration] = useState(0);

  // ======= All states that manage date ======= //
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  // ======= State that keep value of hour in dropdown ======= //
  const [hours, setHours] = useState("");
  // ======= State that keep value of kitchen in dropdown ======= //
  const [kitchen, setKitchen] = useState("");

  // ======= State that keep value of location in input ======= //
  const [location, setLocation] = useState("");

  // ======= State that keep value of address in input ======= //
  const [address, setAddress] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const changeHeight = async () => {
    setHeightDropdown(200);
  };

  const sendInvitation = async () => {
    if (
      inputMessage !== "" &&
      duration !== "" &&
      date !== "" &&
      hours !== "" &&
      kitchen !== "" &&
      location !== "" &&
      address !== ""
    ) {
      let rawResponse = await fetch(`${PRIVATE_URL}/new-invitation`, {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${inputMessage}&duration=${duration}&date=${date}&hour=${hours}&kitchen=${kitchen}&location=${location}&address=${address}&sender=${userState.id}&receiver=${route.params.params._id}`,
      });

      var responseJSON = await rawResponse.json();
      // console.log(responseJSON);
      if (responseJSON.response) {
        navigation.navigate("Mes Forkys");
        // console.log("ma réponse est bonne");
      }
    } else {
      setErrorMessage(true);
    }
  };

  console.log("dans mon screen invitation", route);
  // console.log("userState", userState);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View>
          <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
            <View style={styles.wrapper}>
              <View>
                <Image
                  source={{ uri: route.params.params.photo }}
                  style={styles.img}
                />
                <Badge
                  status="success"
                  containerStyle={{
                    position: "absolute",
                    top: 8,
                    left: 10,
                  }}
                />
              </View>

              <View style={styles.avatar}>
                <Text>
                  <Feather name="edit" size={15} color="#c7d3dc" />
                  <Text style={styles.title2}> Prénom: </Text>
                  <ListItem.Title style={{ fontSize: 15 }}>
                    {route.params.params.name}
                  </ListItem.Title>
                </Text>
                <Text>
                  <Feather name="briefcase" size={15} color="#c7d3dc" />
                  <Text style={styles.title2}> Profession: </Text>
                  <ListItem.Title style={{ fontSize: 15 }}>
                    {route.params.params.profession}
                  </ListItem.Title>
                </Text>

                <Text>
                  <Feather name="plus-circle" size={15} color="#c7d3dc" />
                  <Text style={styles.title2}>Arrondissement: </Text>
                  <ListItem.Title style={{ fontSize: 15 }}>
                    {route.params.params.arrondissement}
                  </ListItem.Title>
                </Text>
              </View>
            </View>
          </Card>
          <View style={styles.invitation}>
            <View style={styles.messageField}>
              <Text style={styles.titleStyle}> Envoyer un message : </Text>
              <View style={styles.textAreaContainer}>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={(e) => setInputMessage(e)}
                  defaultValue={inputMessage}
                  maxLength={300}
                  placeholder={"Entrez votre message ici ..."}
                  placeholderTextColor={"#b2c3cf"}
                  underlineColorAndroid={"transparent"}
                />
              </View>
            </View>

            <View style={styles.invitationField}>
              <Text style={styles.titleStyle}>
                Combien de temps avez-vous ?
              </Text>

              <Slider
                animateTransitions={true}
                maximumTrackTintColor="#CCCCCC"
                minimumTrackTintColor="#F9B34C"
                thumbStyle={{ width: 20, height: 20 }}
                thumbTintColor="#F9B34C"
                thumbTouchSize={{ width: 50, height: 50 }}
                allowTouchTrack
                style={styles.slider}
                maximumValue={1.5}
                step={0.5}
                onValueChange={(value) => setDuration(value)}
                value={duration}
              />
              <View style={styles.sliderView}>
                <Text>30'</Text>
                <Text>1h</Text>
                <Text>1h30'</Text>
                <Text>2h</Text>
              </View>
            </View>
            <View>
              <Text style={styles.titleStyle}> Heure proposée : </Text>
              <DropDownPicker
                items={[
                  {
                    label: "12h",
                    value: 12,
                    icon: () => (
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                  {
                    label: "12h30",
                    value: 12.5,
                    icon: () => (
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                  {
                    label: "13h",
                    value: 13,
                    icon: () => (
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                  {
                    label: "13h30",
                    value: 13.5,
                    icon: () => (
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                  {
                    label: "14h",
                    value: 14,
                    icon: () => (
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                ]}
                placeholder="Proposez une heure"
                defaultValue={hours}
                dropDownMaxHeight={130}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 5,
                  borderColor: "#abd6d3",
                }}
                containerStyle={{
                  height: 40,
                  marginBottom: 15,
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                arrowStyle={{ marginRight: 10 }}
                onChangeItem={
                  (item) => setHours(item.value) // an array of the selected items
                }
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.titleStyle}> Date proposée : </Text>
              <View>
                <Button
                  icon={<Feather name="calendar" size={24} color="white" />}
                  buttonStyle={{
                    backgroundColor: "#F9B34C",
                    margin: 10,
                    width: 250,
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                  titleStyle={{ color: "white", margin: 10 }}
                  onPress={showDatepicker}
                  title={
                    !date
                      ? "Choisir une date"
                      : `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                  }
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View>
              <Text style={styles.titleStyle}> Cuisine proposée : </Text>
              <DropDownPicker
                items={[
                  {
                    label: "Locale",
                    value: "Locale",
                    icon: () => (
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                  {
                    label: "Thailandais",
                    value: "Thailandais",
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
                  {
                    label: "Chinois",
                    value: "Chinois",
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
                    label: "Turk",
                    value: "Turk",
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
                    label: "Créole",
                    value: "Créole",
                    icon: () => (
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={20}
                        color="#F9B34C"
                      />
                    ),
                  },
                ]}
                placeholder="Proposez une cuisine"
                defaultValue={kitchen}
                dropDownMaxHeight={130}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 5,
                  borderColor: "#abd6d3",
                }}
                containerStyle={{
                  height: 40,
                  marginBottom: 15,
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                arrowStyle={{ marginRight: 10 }}
                onChangeItem={
                  (item) => setKitchen(item.value) // an array of the selected items
                }
              />
            </View>
            <View style={styles.location}>
              <Text style={styles.titleStyle}> Nom du restaurant : </Text>
              <Input
                placeholder="Renseignez le nom du restaurant"
                onChangeText={(e) => setLocation(e)}
                value={location}
                placeholderTextColor="#b2c3cf"
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
                  borderBottomColor: "#abd6d3",
                }}
              />
            </View>
            <View style={styles.address}>
              <Text style={styles.titleStyle}> Adresse du restaurant : </Text>
              <Input
                placeholder="Renseignez l'adresse du restaurant"
                onChangeText={(e) => setAddress(e)}
                value={address}
                placeholderTextColor="#b2c3cf"
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
                  borderBottomColor: "#abd6d3",
                }}
              />
            </View>
            <View>
              {errorMessage && (
                <Text style={{ color: "#eb4d4b", textAlign: "center" }}>
                  Vérifiez que toutes les informations aient bien été remplies.
                </Text>
              )}
              <Button
                buttonStyle={{
                  backgroundColor: "#418581",
                  margin: 10,
                  width: 250,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
                title="Envoyer l'invitation"
                onPress={() => sendInvitation()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 26,
    color: "#0b090a",
    letterSpacing: 3,
    lineHeight: 35,
  },
  textReview: {
    fontSize: 15,
  },
  wrapper: {
    flexDirection: "row",
    padding: 5,
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  // reviewIcon: {
  //   paddingVertical: 5,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignSelf: "flex-start",
  // },
  verticleLine: {
    height: "80%",
    alignSelf: "center",
    width: 2,
    backgroundColor: "#f9b34c",
  },
  containerLocation: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  containerJob: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff9f0",
  },
  invitation: {
    padding: 20,
  },
  invitationField: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  messageField: {
    marginBottom: 15,
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },
  titleStyle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#F5FCFF",
  },

  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    fontSize: 12,
    color: "#333",
  },
  textareaContainer: {
    height: 130,
    width: "100%",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#abd6d3",
    borderRadius: 5,
  },
  sliderView: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 30,
  },
  slider: {
    width: "80%",
    alignSelf: "center",
  },
  hours: {
    justifyContent: "space-between",
    marginBottom: 30,
    zIndex: 100,
  },
  date: {
    justifyContent: "space-between",
    marginBottom: 30,
  },
  kitchen: {
    justifyContent: "space-between",
    marginBottom: 30,
    zIndex: 100,
  },
  location: {
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
});

function mapStateToProps(state) {
  // console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(InvitationScreen);
