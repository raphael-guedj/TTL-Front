import React, { useEffect, useState } from "react";

import { View, Image, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PRIVATE_URL } from "../config";

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

const IconBar = ({ myId, refreshing }) => {
  const [isNotifUnRead, setIsNotifUnRead] = useState();

  useEffect(() => {
    const checkNotif = async () => {
      let rawResponse = await fetch(
        `${PRIVATE_URL}/checkstatusnotif?id=${myId}`
      );
      let response = await rawResponse.json();
      setIsNotifUnRead(response.notifUnread);
    };
    checkNotif();
  }, [refreshing]);

  const updateNotif = async () => {
    let rawResponse = await fetch(`${PRIVATE_URL}/updatenotif?id=${myId}`);
    let response = await rawResponse.json();
  };

  const navigation = useNavigation();
  return (
    <View style={{ paddingRight: 20 }}>
      <TouchableOpacity
        onPress={() => {
          updateNotif();
          navigation.navigate("Notifications");
        }}
      >
        <Ionicons name="md-notifications" size={34} color="#418581" />
        {isNotifUnRead && (
          <Badge
            status="error"
            containerStyle={{
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const SettingsBar = () => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingRight: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Réglages")}>
        <View style={{ flexDirection: "row" }}>
          <Feather
            style={{ margin: 10 }}
            name="settings"
            size={28}
            color="#418581"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { HeaderBarImage, IconBar, SettingsBar };
