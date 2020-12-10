import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import { Card, Button, Avatar, Accessory, Input } from "react-native-elements";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserProfilScreen = ({ route, navigation }) => {
  const userSelected = route.params;
  console.log(userSelected);
  return (
    <View style={{ flex: 1 }} contentContainerStyle={{ minHeight: "100%" }}>
      <View style={styles.avatar}>
        <Image style={styles.image} source={require("../assets/profile.jpg")} />
        <View style={{ width: "70%" }}>
          <Text style={{ borderWidth: 0.5, borderRadius: 5 }}>Hello</Text>

          <Input
            placeholder="Profession"
            value=""
            placeholderTextColor="#606770"
            leftIcon={<Feather name="briefcase" size={20} color="black" />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  title1: {
    fontSize: 20,
    color: "#418581",
    margin: 10,
  },
  title2: {
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
    padding: 10,
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
  },
});

export default UserProfilScreen;
