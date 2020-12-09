import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory, Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserProfilScreen = ({ route, navigation }) => {
  const userSelected = route.params;
  console.log(userSelected);
  return (
    <View>
      <Text>Hallo</Text>
    </View>
  );
};

export default UserProfilScreen;
