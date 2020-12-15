import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import Modal from "react-native-modal";
import { Button, Card, Badge, ListItem } from "react-native-elements";
import { PRIVATE_URL } from "../config";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

const MyInvitationScreen = ({ dataInvit, onRefresh }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalCancelVisible, setModalCancelVisible] = useState(false);
  const [listUser, setListUser] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getUserData = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/mydataprofile?id=${dataInvit.id_receiver}`
      );
      let response = await rawResponse.json();
      setListUser(response.user);
    };
    getUserData();
  }, []);

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

  if (!listUser) {
    return <AppLoading />;
  }
  return (
    <View>
      <Card
        containerStyle={{
          padding: 0,
          marginVertical: 25,
          borderRadius: 5,
          borderColor: "#abd6d3",
        }}
      >
        <View style={styles.wrapper}>
          <View
            style={{
              flex: 0.5,
            }}
          >
            <View style={styles.containerImgData}>
              <View>
                <Image source={{ uri: listUser.photo }} style={styles.img} />

                <Badge
                  status={listUser.isConnected ? "success" : "error"}
                  containerStyle={{
                    position: "absolute",
                    top: 2,
                    left: 8,
                  }}
                />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <ListItem.Title>{listUser.name}</ListItem.Title>
                <ListItem.Subtitle>{listUser.profession}</ListItem.Subtitle>
              </View>
            </View>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={styles.containerLocation}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                paddingLeft: 10,
              }}
            >
              <ListItem.Title>
                {listUser.arrondissement} {listUser.city}
              </ListItem.Title>
              <MaterialIcons
                name="cancel"
                size={35}
                color="#F9B34C"
                onPress={toggleModalCancel}
              />
            </View>
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
                    padding: 0,
                    marginVertical: 25,
                    borderRadius: 5,
                    borderColor: "#abd6d3",
                  }}
                >
                  <View style={styles.wrapper}>
                    <View
                      style={{
                        flex: 0.5,
                      }}
                    >
                      <View style={{ paddingHorizontal: 10 }}>
                        <ListItem.Title>
                          {dataInvit.lieu_propose}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          {dataInvit.message}
                        </ListItem.Subtitle>
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
                  title="Retour à mes invitations envoyées"
                  onPress={toggleModal}
                />
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  wrapper: {
    flexDirection: "row",
    padding: 15,
  },
  containerImgData: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  reviewIcon: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  verticleLine: {
    height: "80%",
    alignSelf: "center",
    width: 2,
    backgroundColor: "#CCCCCC",
  },
  containerLocation: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  containerInvit: {
    width: "100%",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#418581",
  },
  listItem: {
    marginTop: 20,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    letterSpacing: 1,
  },
});

export default MyInvitationScreen;
