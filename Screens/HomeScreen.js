import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Card, Badge } from "react-native-elements";

const HomeScreen = () => {
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
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f1faee",
    minHeight: "100%",
  },
});

export default HomeScreen;
