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
import Modal from "react-native-modal";
import { Button, Card, Badge, ListItem } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const NotifScreenReceived = ({ userState, navigation }) => {
  const [listUser, setListUser] = useState([]);
  const [invit, setInvit] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(
        `http://172.16.0.18:3000/alluser?id=${userState.id}`
      );
      let response = await rawResponse.json();
      // console.log(response);
      setListUser(response.userExcl);
    };
    getUser();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 5 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {listUser.map((user, i) => (
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
                    <Image source={{ uri: user.photo }} style={styles.img} />

                    <Badge
                      status={user.isConnected ? "success" : "error"}
                      containerStyle={{
                        position: "absolute",
                        top: 2,
                        left: 8,
                      }}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 10 }}>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.profession}</ListItem.Subtitle>
                  </View>
                </View>
              </View>
              <View style={styles.verticleLine}></View>
              <View style={styles.containerLocation}>
                <View style={{ paddingHorizontal: 10 }}></View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <ListItem.Title>
                    {user.arrondissement} {user.city}
                  </ListItem.Title>
                  <MaterialIcons name="cancel" size={30} color="#F9B34C" />
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
                          <View></View>
                          <View style={{ paddingHorizontal: 10 }}>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>
                              {user.profession}
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
        ))}
      </View>
    </ScrollView>
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
});

function mapStateToProps(state) {
  // console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(NotifScreenReceived);
