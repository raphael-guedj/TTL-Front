import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { Card, Button, Badge, ListItem } from "react-native-elements";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { PRIVATE_URL } from "../config";

function CardLunch({ onRefresh, invit, userState }) {
  const [isModalConfirmed, setModalConfirmed] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (invit.id_sender == userState.id) {
        let response = await fetch(
          `${PRIVATE_URL}/getmydata?id=${invit.id_receiver}`
        );
        let responseJson = await response.json();
        setUser(responseJson.myUser);
      } else {
        let response = await fetch(
          `${PRIVATE_URL}/getmydata?id=${invit.id_sender}`
        );
        let responseJson = await response.json();
        setUser(responseJson.myUser);
      }
    };
    getUser();
  }, [invit]);

  const cancelInvit = async () => {
    let response = await fetch(`${PRIVATE_URL}/cancelinvit?id=${invit._id}`);
    let responseJson = await response.json();
    if (responseJson.result) {
      setModalConfirmed(false);
      onRefresh();
    }
  };

  return !user ? (
    <></>
  ) : (
    <View>
      <View style={styles.view}>
        <Feather
          name="calendar"
          size={32}
          color={
            (invit.statut_invit == "Refusé" && "#eb4d4b") ||
            (invit.statut_invit == "En cours" && "#ffa500") ||
            (invit.statut_invit == "Accepté" && "#418581")
          }
        />
        <Text style={styles.title2}>
          {invit.date < Date.now() ? "Date passé" : invit.date}
        </Text>
      </View>
      <View>
        <Card
          containerStyle={{
            borderRadius: 5,
            borderColor: "#abd6d3",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={
                  user.photo
                    ? { uri: user.photo }
                    : require("../assets/default_avatar.jpg")
                }
                style={styles.img}
              />
              <Badge
                status={user.isConnected ? "success" : "error"}
                containerStyle={{
                  position: "absolute",
                  top: 8,
                  left: 10,
                }}
              />
            </View>
            <View>
              <Text style={styles.title3}>
                {" "}
                Votre déjeuner avec {user.name}{" "}
              </Text>
              <Text style={styles.text}>
                <Feather name="calendar" size={15} color="#c7d3dc" />
                Rendez-vous:{" "}
                {(invit.heure == 12 && "12h") ||
                  (invit.heure == 12.5 && "12h30") ||
                  (invit.heure == 13 && "13h") ||
                  (invit.heure == 13.5 && "13h30") ||
                  (invit.heure == 14 && "14h")}
              </Text>
              <Text style={styles.text}>
                <Feather name="map-pin" size={15} color="#c7d3dc" />
                Restaurant: {invit.lieu_propose}
              </Text>
              <Text>Adresse: {invit.adresse}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 4.7 </Text>
            </Text>

            <Button
              type="outline"
              buttonStyle={{ borderColor: "#418581", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
              onPress={() => setModalConfirmed(true)}
            />
            <Modal isVisible={isModalConfirmed}>
              <View>
                <Card
                  containerStyle={{
                    borderRadius: 5,
                    borderColor: "#abd6d3",
                    height: "80%",

                    paddingHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <Feather name="check-square" size={80} color="green" />
                    <ListItem.Title
                      style={{
                        fontWeight: "bold",
                        color: "#418581",
                        marginTop: 20,
                      }}
                    >
                      CONFIRMATION
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.listItem}>
                      Bonjour Kevin, votre RDV est désormais confirmé.
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItem}>
                      Merci pour votre réservation, qui vous rapporte 100 Forky
                      ! Profitez bien de votre repas, et pensez ensuite à
                      déposer votre avis. A noter que votre invité(e) vous
                      attendra directement sur place !
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItem}>
                      A noter que votre invité(e) vous attendra directement sur
                      place !
                    </ListItem.Subtitle>
                  </View>
                </Card>
                <Button
                  buttonStyle={{
                    backgroundColor: "#418581",
                    margin: 10,
                    width: 250,
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                  title="Annuler mon RDV"
                  onPress={() => cancelInvit()}
                />
                <Button
                  buttonStyle={{
                    backgroundColor: "#F9B34C",
                    margin: 10,
                    width: 250,
                    borderRadius: 20,
                    alignSelf: "center",
                  }}
                  title="Retour"
                  onPress={() => setModalConfirmed(false)}
                />
              </View>
            </Modal>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  title3: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  title1: {
    fontSize: 15,
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },

  text: {
    fontSize: 15,
    color: "black",
    marginLeft: 10,
    margin: 5,
    maxWidth: "80%",
  },
  listItem: {
    marginTop: 20,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(CardLunch);
