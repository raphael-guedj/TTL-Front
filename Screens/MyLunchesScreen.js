import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Card, Button, Avatar, Badge, ListItem } from "react-native-elements";
import { Feather, FontAwesome, Entypo } from "@expo/vector-icons";

function MyLunchesScreen({ navigation, userState }) {
  const [isModalConfirmed, setModalConfirmed] = useState(false);
  const [isModalCanceled, setModalCanceled] = useState(false);

  return (
    <ScrollView>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#418581" />
        <Text style={styles.title2}> 20/12/2020 </Text>
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
                source={require("../assets/clara.jpg")}
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
            <View>
              <Text style={styles.title3}> Votre déjeuner avec Clara </Text>
              <Text style={styles.text}>
                <Feather name="calendar" size={15} color="#c7d3dc" />{" "}
                Rendez-vous à 12h30{" "}
              </Text>
              <Text style={styles.text}>
                <Feather name="map-pin" size={15} color="#c7d3dc" /> Au
                restaurant "Le Barbu marseillais"
              </Text>
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
              <Text style={styles.title2}> 4.7</Text>
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
                      Votre RDV avec Jojo est désormais confirmé.
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
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#eb4d4b" />
        <Text style={styles.title2}> 11/12/2020 </Text>
      </View>
      <View>
        <Card
          containerStyle={{
            borderRadius: 5,
            borderColor: "#eb4d4b",
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
                source={require("../assets/profile.jpg")}
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
            <View>
              <Text style={styles.title3}> Votre déjeuner avec Jojo </Text>
              <Text style={styles.text}>
                <Feather name="calendar" size={15} color="#c7d3dc" />{" "}
                Rendez-vous à 13h30{" "}
              </Text>
              <Text style={styles.text}>
                <Feather name="map-pin" size={15} color="#c7d3dc" /> Au
                restaurant "Pastis et Olive"
              </Text>
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
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 3.7 </Text>
            </Text>

            <Button
              type="outline"
              buttonStyle={{ borderColor: "#eb4d4b", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
              onPress={() => setModalCanceled(true)}
            />
            <Modal isVisible={isModalCanceled}>
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
                    <Entypo name="squared-cross" size={80} color="#eb4d4b" />
                    <ListItem.Title
                      style={{
                        fontWeight: "bold",
                        color: "#418581",
                        marginTop: 20,
                      }}
                    >
                      ANNULATION
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.listItem}>
                      Oups Clara à eu un empêchement de dernière minute et ne
                      pourra pas venir au déjeuner.
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItemBold}>
                      Votre déjeuner au restaurant "Pastis et Olive" a été
                      annulé !
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listItem}>
                      À noter que vous pouvez reproposer une nouvelle date à
                      votre invité(e) !
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
                  title="Proposer une autre date ?"
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
                  onPress={() => setModalCanceled(false)}
                />
              </View>
            </Modal>
          </View>
        </Card>
      </View>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#F9B34C" />
        <Text style={styles.title2}> 03/12/2020 </Text>
      </View>
      <View>
        <Card
          containerStyle={{
            borderRadius: 5,
            borderColor: "#F9B34C",
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
                source={require("../assets/profile2.jpg")}
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
            <View>
              <Text style={styles.title3}> Votre déjeuner avec Jennifer </Text>
              <Text style={styles.text}>
                <Feather name="calendar" size={15} color="#c7d3dc" />{" "}
                Rendez-vous à 12h30{" "}
              </Text>
              <Text style={styles.text}>
                <Feather name="map-pin" size={15} color="#c7d3dc" /> Au
                restaurant "Un jardin en ville"
              </Text>
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
              <Text style={styles.title2}> 4.2 </Text>
            </Text>

            <Button
              type="outline"
              buttonStyle={{ borderColor: "#F9B34C", borderWidth: 1 }}
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
    </ScrollView>
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
    maxWidth: "83%",
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
    maxWidth: "83%",
  },
  listItem: {
    marginTop: 20,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    letterSpacing: 1,
  },
  listItemBold: {
    marginTop: 20,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: "bold",
  },
});

export default MyLunchesScreen;