import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Camera } from "expo-camera";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Button, Overlay } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { PRIVATE_URL } from "../config";

const SnapScreen = ({ userState, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  var camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleTakePicture = async () => {
    if (camera) {
      toggleOverlay();
      let photo = await camera.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true,
      });

      var data = new FormData();
      data.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo_user.jpg",
        id: userState.id,
      });
      let rawResponse = await fetch(
        `${PRIVATE_URL}/uploadPhoto?id=${userState.id}`,
        {
          method: "post",
          body: data,
        }
      );

      let response = await rawResponse.json();

      if (response.result) {
        setVisible(false);
        navigation.navigate("Modifier mon profil");
      }
    }
  };

  let iconFlash;
  if (flash) {
    iconFlash = <Ionicons name="ios-flash" size={30} color="#00b4d8" />;
  } else {
    iconFlash = <Ionicons name="ios-flash" size={30} color="white" />;
  }

  if (hasPermission && isFocused) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flash}
          ratio="16:9"
          ref={(ref) => (camera = ref)}
        >
          <View style={styles.touchableContainer}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="ios-reverse-camera" size={35} color="white" />
                <Text style={styles.textTouchable}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              >
                {iconFlash}
                <Text style={styles.textTouchable}>
                  {flash ? "Flash on" : "Flash off"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
            margin: 20,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          icon={<Ionicons name="ios-save" style={styles.iconSend} />}
          title="Prendre une photo"
          onPress={() => handleTakePicture()}
        />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Loading...</Text>
        </Overlay>
      </View>
    );
  } else {
    return (
      <Text style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        No access to camera
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  touchable: {
    marginBottom: 5,
    paddingHorizontal: 7.5,
    alignItems: "center",
  },
  cameraTouchable: {
    marginBottom: 5,
    backgroundColor: "red",
    alignItems: "center",
  },
  textTouchable: {
    fontSize: 15,
    marginBottom: 10,
    color: "white",
  },
  iconSend: {
    fontSize: 25,
    color: "#fcfcfc",
    marginHorizontal: 5,
  },
});

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(SnapScreen);
