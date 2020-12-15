import React from "react";

import { View, Image, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderBarImage = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../assets/Logo_Forky_dark.png")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 40 / 2,
            marginLeft: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const IconBar = () => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingRight: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
        <Ionicons name="md-notifications" size={34} color="#418581" />
        <Badge
          status="error"
          containerStyle={{
            position: "absolute",
            top: 1,
            right: 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export { HeaderBarImage, IconBar };
