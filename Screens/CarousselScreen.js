import React from "react";
import { Button } from "react-native-elements";
import { Dimensions } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import faker from "faker";

export const carouselData = [
  {
    title: "Facebook",
    description: "Connect with friends and the world around you on Facebook.",
    renderIcon: () => <AwesomeIcon name="facebook-square" size={28} />,
    bgColor: "#3B5998",
  },
  {
    title: "WhatsApp",
    description:
      "With WhatsApp, you will get fast, simple, secure messaging and calling for free*, available on phones all over the world.",
    renderIcon: () => <AwesomeIcon name="whatsapp" size={28} />,
    bgColor: "#43d854",
  },
  {
    title: "Instagram",
    description: "Bringing you closer to the people and things you love.",
    renderIcon: () => <AwesomeIcon name="instagram" size={28} />,
    bgColor: "#C13584",
  },
];

export const colors = {
  kellyGreen: "#6BCD28",
  shipCove: "#7A8EB1",
  white: "#FFFFFF",
  biscay: "#2B3857",
};

export const USERS = Array(10)
  .fill(null)
  .map((_, idx) => ({
    id: idx,
    avatar: faker.image.avatar(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  }));

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const CAROUSEL_VERTICAL_OUTPUT = 56;
export const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

function CarousselScreen({ navigation }) {
  return (
    <Button
      buttonStyle={{
        backgroundColor: "#F9B34C",
        margin: 10,
        width: 250,
        borderRadius: 20,
      }}
      title="Inscription"
      onPress={() => navigation.navigate("SignUpScreen")}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000a0",
  },

  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    color: "#009788",
  },
  logo: {
    width: 160,
    height: 160,
  },
  linkedin: {
    color: "white",
    margin: 20,
  },
  linkedinImage: {
    width: 30,
    height: 30,
  },
});

export default CarousselScreen;
