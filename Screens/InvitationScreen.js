import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { ListItem, Card, Badge, Slider, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const InvitationScreen = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 25 }}
    >
      <View>
        <Card containerStyle={{ padding: 0, marginVertical: 5 }}>
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
              </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <ListItem.Title>Clara</ListItem.Title>
              <ListItem.Title>Architecte</ListItem.Title>
              <ListItem.Title>Distance: 200m</ListItem.Title>

              <View style={styles.reviewIcon}>
                <FontAwesome name="star" size={17} color="#418581" />
                <FontAwesome name="star" size={17} color="#418581" />
                <FontAwesome name="star" size={17} color="#418581" />
                <FontAwesome name="star-o" size={17} color="#418581" />
                <FontAwesome name="star-o" size={17} color="#418581" />
              </View>
            </View>
          </View>
        </Card>
        <View style={styles.invitation}>
          <View style={styles.messageField}>
            <Text style={{ marginBottom: 5 }}>Envoyez un message</Text>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              maxLength={150}
              placeholder="Soyez courtois et précis. Max. 150 caractères."
              onChangeText={(e) => {
                setInputMessage(e), console.log(inputMessage);
              }}
              value={inputMessage}
            />
          </View>
          <View style={styles.invitationField}>
            <Text>Combien de temps proposez-vous?</Text>
            <Slider
              maximumTrackTintColor="#418581"
              minimumTrackTintColor="#F9B34C"
              thumbStyle={{ width: 20, height: 20 }}
              thumbTintColor="#F9B34C"
              thumbTouchSize={{ width: 50, height: 50 }}
              allowTouchTrack
              style={styles.slider}
              maximumValue={1.5}
              step={0.5}
              onValueChange={(value) => {
                setSliderValue(value), console.log(sliderValue);
              }}
              value={sliderValue}
            />
          </View>
          <View style={styles.hours}>
            <Text>Heure proposée</Text>
          </View>
        </View>
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
    alignSelf: "flex-start",
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
  invitation: {
    padding: 20,
  },
  invitationField: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  messageField: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  slider: {
    width: "80%",
    alignSelf: "center",
  },
  hours: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    color: "blue",
    width: 80,
    backgroundColor: "blue",
    color: "blue",
    display: "none",
  },
  toggleButton: {
    width: 100,
    color: "#fff9f0",
  },
});

export default InvitationScreen;
