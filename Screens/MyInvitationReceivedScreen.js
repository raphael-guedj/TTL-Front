import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";
import Modal from "react-native-modal";
import { Button, Card, Badge, ListItem } from "react-native-elements";
import { PRIVATE_URL } from "../config";
import {
  MaterialIcons,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";

const MyInvitationReceivedScreen = ({ dataInvit, onRefresh }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalCancelVisible, setModalCancelVisible] = useState(false);
  const [isModalAcceptVisible, setModalAcceptVisible] = useState(false);
  const [listUser, setListUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/mydataprofile?id=${dataInvit.id_sender}`
      );
      let response = await rawResponse.json();
      setListUser(response.user);
    };
    getUserData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalCancel = () => {
    const cancelInvitation = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/cancelinvit?id=${dataInvit._id}`
      );
      let response = await rawResponse.json();
      if (response.result) {
        setModalCancelVisible(true);
      }
    };
    cancelInvitation();
  };

  const toggleModalAccept = () => {
    const acceptInvitation = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/acceptinvit?id=${dataInvit._id}`
      );
      let response = await rawResponse.json();
      if (response.result) {
        setModalAcceptVisible(true);
      }
    };
    acceptInvitation();
  };

  if (!listUser) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 20,
        // justifyContent: "space-evenly",
      }}
    >
      <Card
        containerStyle={{
          padding: 0,
          marginVertical: 15,
          borderRadius: 5,
          borderColor: "#418581",
          width: "80%",
          marginHorizontal: 0,
        }}
      >
        <View style={styles.wrapper}>
          <View>
            <Image source={{ uri: listUser.photo }} style={styles.img} />
            <Badge
              status={listUser.isConnected ? "success" : "error"}
              containerStyle={{
                position: "absolute",
                top: 6,
                left: 8,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              maxWidth: "80%",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.containerArea}>
              <Text>
                <Feather name="edit" size={16} color="#c7d3dc" />
                <ListItem.Subtitle> {listUser.name}</ListItem.Subtitle>
              </Text>
            </View>

            <View style={styles.containerArea}>
              <Text>
                <Feather name="briefcase" size={16} color="#c7d3dc" />
                <ListItem.Subtitle> {listUser.profession}</ListItem.Subtitle>
              </Text>
            </View>
            <View style={styles.containerArea}>
              <Text>
                <Feather name="map-pin" size={15} color="#c7d3dc" />
                <ListItem.Subtitle style={styles.text}>
                  {" "}
                  {listUser.arrondissement} {"-"} {listUser.city}
                </ListItem.Subtitle>
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.containerInvit}>
            <Text style={{ fontWeight: "bold", color: "#f5f3f4" }}>
              Voir les détails de l'invitation
            </Text>
            <Modal isVisible={isModalVisible} backdropColor={"#f5f3f4"}>
              <View>
                <Card
                  containerStyle={{
                    borderRadius: 5,
                    borderColor: "#abd6d3",
                  }}
                >
                  <View style={{ padding: 15 }}>
                    <View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                        }}
                      >
                        <Card.Title style={styles.title}>
                          Recap de mon invitation
                        </Card.Title>
                        <Card.Divider />
                        <Text style={styles.margin}>
                          <Feather name="calendar" size={15} color="#c7d3dc" />
                          <Text style={styles.title2}> Date: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {moment(dataInvit.date).format("DD/MM/YYYY")}
                          </ListItem.Title>
                        </Text>
                        <Text style={styles.margin}>
                          <Feather name="clock" size={15} color="#c7d3dc" />
                          <Text style={styles.title2}> Heure: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {dataInvit.heure == 12
                              ? "12h"
                              : dataInvit.heure == 12.5
                              ? "12h30"
                              : dataInvit.heure == 13
                              ? "13h"
                              : dataInvit.heure == 13.5
                              ? "13h30"
                              : "14h"}
                          </ListItem.Title>
                        </Text>
                        <Text style={styles.margin}>
                          <Feather
                            name="plus-circle"
                            size={15}
                            color="#c7d3dc"
                          />
                          <Text style={styles.title2}> Temps disponible: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {dataInvit.temps_propose == 0.5
                              ? "30min"
                              : dataInvit.temps_propose == 1
                              ? "1h"
                              : dataInvit.temps_propose == 1.5
                              ? "1h30"
                              : "2h"}
                          </ListItem.Title>
                        </Text>
                        <Text style={styles.margin}>
                          <Feather name="map-pin" size={15} color="#c7d3dc" />
                          <Text style={styles.title2}> Lieu proposé: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {dataInvit.lieu_propose}
                          </ListItem.Title>
                        </Text>
                        <Text style={styles.margin}>
                          <Entypo name="address" size={15} color="#c7d3dc" />
                          <Text style={styles.title2}> Adresse: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {dataInvit.adresse}
                          </ListItem.Title>
                        </Text>
                        <Text style={styles.margin}>
                          <MaterialCommunityIcons
                            name="silverware-fork-knife"
                            size={15}
                            color="#c7d3dc"
                          />
                          <Text style={styles.title2}> Cuisine proposée: </Text>
                          <ListItem.Title style={{ fontSize: 13 }}>
                            {dataInvit.cuisine_propose}
                          </ListItem.Title>
                        </Text>

                        <Text style={styles.margin}>
                          <Feather name="mail" size={15} color="#c7d3dc" />
                          <Text style={styles.title2}> Message: </Text>
                          <ListItem.Title
                            style={{ fontSize: 13, lineHeight: 20 }}
                          >
                            {dataInvit.message}
                          </ListItem.Title>
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
                <Button
                  buttonStyle={{
                    backgroundColor: "#F9B34C",
                    margin: 10,
                    width: 250,
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                  title="Retour à mes invitations"
                  onPress={toggleModal}
                />
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
      </Card>

      <Modal isVisible={isModalCancelVisible}>
        <View>
          <Card
            containerStyle={{
              borderRadius: 5,
              borderColor: "#abd6d3",
              paddingHorizontal: 10,
              height: "40%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <ListItem.Title
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#418581",
                }}
              >
                Votre invitation avec {listUser.name} a été annulé !
              </ListItem.Title>

              <Button
                buttonStyle={{
                  backgroundColor: "#F9B34C",
                  width: 100,
                  borderRadius: 20,
                  justifyContent: "center",
                }}
                title="Retour"
                onPress={() => {
                  setModalCancelVisible(false);
                  onRefresh();
                }}
              />
            </View>
          </Card>
        </View>
      </Modal>
      <View
        style={{
          alignItems: "center",
          // flexDirection: "row",
          width: 80,
          justifyContent: "space-evenly",
        }}
      >
        <MaterialIcons
          name="cancel"
          size={41}
          color="#F9B34C"
          onPress={toggleModalCancel}
        />
        <Feather
          name="check-circle"
          size={35}
          color="#418581"
          onPress={toggleModalAccept}
        />
      </View>
      <Modal isVisible={isModalAcceptVisible}>
        <View>
          <Card
            containerStyle={{
              borderRadius: 5,
              borderColor: "#abd6d3",
              paddingHorizontal: 10,
              height: "40%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <ListItem.Title
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#418581",
                  textAlign: "center",
                }}
              >
                Super ! Vous avez accepté l'invitation de {listUser.name}. A vos
                Forky 🍴
              </ListItem.Title>

              <Button
                buttonStyle={{
                  backgroundColor: "#F9B34C",
                  width: 100,
                  borderRadius: 20,
                  justifyContent: "center",
                }}
                title="Retour"
                onPress={() => {
                  setModalAcceptVisible(false);
                  onRefresh();
                }}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    padding: 15,
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    borderWidth: 1.5,
    borderColor: "#d9eceb",
  },
  containerInvit: {
    width: "100%",
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#418581",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#418581",
  },
  title2: {
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },
  margin: {
    marginVertical: 6,
  },
});

{
}

export default MyInvitationReceivedScreen;
