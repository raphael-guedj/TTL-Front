import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Badge } from "react-native-elements";
import { Feather, FontAwesome } from "@expo/vector-icons";

function MyLunchesScreen({ navigation, userState }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");

  return (
    <ScrollView>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#418581" />
        <Text style={styles.title2}> 20/12/2020 </Text>
      </View>
      <View>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#abd6d3" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/clara.jpg")} style={styles.img} />
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                top: 8,
                left: 10,
              }}
            />
            <View>
              <Text style={styles.text}> Déjeuner avec Clara </Text>
              <Text style={styles.text}> À 12h30 </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 4.7 </Text>
            </Text>
            <Button
              type="outline"
              buttonStyle={{ borderColor: "#418581", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
            />
          </View>
        </Card>
      </View>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#fbc87d" />
        <Text style={styles.title2}> 12/11/2020 </Text>
      </View>
      <View>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#fbc87d" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/clara.jpg")} style={styles.img} />
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                top: 8,
                left: 10,
              }}
            />
            <View>
              <Text style={styles.text}> Déjeuner avec Jojo </Text>
              <Text style={styles.text}> À 13h30 </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 4.2 </Text>
            </Text>
            <Button
              type="outline"
              buttonStyle={{ borderColor: "#fbc87d", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
            />
          </View>
        </Card>
      </View>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#eb4d4b" />
        <Text style={styles.title2}> 07/11/2020 </Text>
      </View>
      <View>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#eb4d4b" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/clara.jpg")} style={styles.img} />
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                top: 8,
                left: 10,
              }}
            />
            <View>
              <Text style={styles.text}> Déjeuner avec Riri </Text>
              <Text style={styles.text}> À 13h00 </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 3.7 </Text>
            </Text>
            <Button
              type="outline"
              buttonStyle={{ borderColor: "#eb4d4b", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
            />
          </View>
        </Card>
      </View>
      <View style={styles.view}>
        <Feather name="calendar" size={32} color="#eb4d4b" />
        <Text style={styles.title2}> 07/11/2020 </Text>
      </View>
      <View>
        <Card containerStyle={{ borderRadius: 5, borderColor: "#fbc87d" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/clara.jpg")} style={styles.img} />
            <Badge
              status="success"
              containerStyle={{
                position: "absolute",
                top: 8,
                left: 10,
              }}
            />
            <View>
              <Text style={styles.text}> Déjeuner avec Fifi </Text>
              <Text style={styles.text}> À 12h00 </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star" size={15} color="#f9b34c" />
              <FontAwesome name="star-o" size={15} color="#f9b34c" />
              <Text style={styles.title2}> 4.7 </Text>
            </Text>
            <Button
              type="outline"
              buttonStyle={{ borderColor: "#fbc87d", borderWidth: 1 }}
              titleStyle={{ color: "black", padding: 10 }}
              title="Détails"
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  title2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },
  text: {
    fontSize: 15,
    color: "black",
    margin: 5,
  },
});

export default MyLunchesScreen;
