import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ListItem, Card, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const [isTokenExist, setIsTokenExist] = useState(false);

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
      // let rawResponse = await fetch("http://172.16.0.22:3000/user-list");
      // let response = await rawResponse.json();
      // console.log(response);
    };
    getUser();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 25 }}
    >
      <View style={{ alignSelf: "center" }}>
        <Text style={[styles.text, { fontFamily: "FaunaOne_400Regular" }]}>
          Organisez votre Dej !
        </Text>
      </View>
      <View>
        {[1, 2, 3, 4].map((e, i) => (
          <TouchableOpacity key={i} onPress={() => {}}>
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
                        status="success"
                        containerStyle={{
                          position: "absolute",
                          top: 2,
                          left: 8,
                        }}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                      <ListItem.Title>Clara</ListItem.Title>
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
                <Text>Profession: Architecte</Text>
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
    alignItems: "center",
    backgroundColor: "#fff9f0",
  },
});

function mapStateToProps(state) {
  // console.log(state.data);
  // return { user: state.user };
}

export default HomeScreen;
