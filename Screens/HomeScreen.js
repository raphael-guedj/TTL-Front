import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ListItem, Card, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = ({ userState, navigation }) => {
  const [listUser, setListUser] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          // console.log(location);
        });
      }
    }
    askPermissions();
    const getUser = async () => {
      let rawResponse = await fetch(
        `http://172.16.0.15:3000/alluser?id=${userState.id}`
      );
      let response = await rawResponse.json();
      // console.log(response);
      setListUser(response.userExcl);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let rawResponse = await fetch(
        `http://172.16.0.15:3000/alluser?id=${userState.id}`
      );
      let response = await rawResponse.json();
      // console.log(response);
      setListUser(response.userExcl);
    };
    getUser();
  }, [refreshing]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 25 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ alignSelf: "center" }}>
        <Text style={[styles.text, { fontFamily: "FaunaOne_400Regular" }]}>
          Organisez votre Dej !
        </Text>
      </View>
      <View>
        {listUser.map((user, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate("Profil Utilisateur", user);
            }}
          >
            <Card containerStyle={{ padding: 0, marginVertical: 25 }}>
              <View style={styles.wrapper}>
                <View
                  style={{
                    flex: 0.5,
                  }}
                >
                  <View style={styles.containerImgData}>
                    <View>
                      <Image
                        source={require("../assets/clara.jpg")}
                        style={styles.img}
                      />

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
                      <ListItem.Subtitle>15 reviews</ListItem.Subtitle>
                    </View>
                  </View>

                  <View style={styles.reviewIcon}>
                    <FontAwesome name="star" size={17} color="#418581" />
                    <FontAwesome name="star" size={17} color="#418581" />
                    <FontAwesome name="star" size={17} color="#418581" />
                    <FontAwesome name="star-o" size={17} color="#418581" />
                    <FontAwesome name="star-o" size={17} color="#418581" />
                  </View>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.containerLocation}>
                  <View style={{ paddingHorizontal: 15 }}>
                    <FontAwesome name="map-marker" size={34} color="#418581" />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <ListItem.Title>Situé à 200m</ListItem.Title>
                    <ListItem.Subtitle>13007 Marseille</ListItem.Subtitle>
                  </View>
                </View>
              </View>

              <View style={styles.containerJob}>
                <Text style={{ fontWeight: "bold" }}>Profession: </Text>
                <Text>Architecte</Text>
              </View>
            </Card>
          </TouchableOpacity>
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
  text: {
    fontSize: 26,
    color: "#0b090a",
    letterSpacing: 3,
    lineHeight: 35,
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
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff9f0",
  },
});

function mapStateToProps(state) {
  // console.log("state", state.user.id);
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(HomeScreen);
