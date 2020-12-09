import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Card, Button, Avatar, Accessory, Input } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

function EditProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Image
              style={styles.image}
              source={require("../assets/profile.jpg")}
            />
            <View style={{ width: "70%" }}>
              <Input
                placeholder="Prénom"
                onChangeText=""
                value=""
                placeholderTextColor="black"
                leftIcon={<Feather name="edit" size={20} color="black" />}
                leftIconContainerStyle={{
                  marginHorizontal: 5,
                }}
                inputStyle={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "Roboto_400Regular",
                }}
                inputContainerStyle={{
                  borderBottomColor: "black",
                }}
              />
              <Input
                placeholder="Profession"
                onChangeText=""
                value=""
                placeholderTextColor="black"
                leftIcon={<Feather name="briefcase" size={20} color="black" />}
                leftIconContainerStyle={{
                  marginHorizontal: 5,
                }}
                inputStyle={{
                  color: "#fff",
                  fontSize: 15,
                  fontFamily: "Roboto_400Regular",
                }}
                inputContainerStyle={{
                  borderBottomColor: "black",
                }}
              />
            </View>
          </View>

          <Input
            placeholder="Ville"
            onChangeText=""
            value=""
            placeholderTextColor="black"
            leftIcon={<Feather name="briefcase" size={20} color="black" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "black",
            }}
          />
          <Input
            placeholder="Arrondissement"
            onChangeText=""
            value=""
            placeholderTextColor="black"
            leftIcon={<Feather name="briefcase" size={20} color="black" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "black",
            }}
          />
          <Input
            placeholder="Profession"
            onChangeText=""
            value=""
            placeholderTextColor="black"
            leftIcon={<Feather name="briefcase" size={20} color="black" />}
            leftIconContainerStyle={{
              marginHorizontal: 5,
            }}
            inputStyle={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Roboto_400Regular",
            }}
            inputContainerStyle={{
              borderBottomColor: "black",
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{
          flex: 0.1,
        }}
      >
        <Button
          buttonStyle={{
            backgroundColor: "#418581",
            margin: 10,
            width: 250,
            borderRadius: 20,
            alignSelf: "center",
          }}
          title="Enregistrer"
          onPress={() => navigation.navigate("Enregistrer")}
        />
      </View>
    </View>
  );
}

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
    backgroundColor: "red",
  },
  avatar: {
    flexDirection: "row",
    backgroundColor: "green",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});

export default EditProfileScreen;
