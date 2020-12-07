import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

// slides
const slides = [
  {
    key: "Slide 1",
    title: "",
    text: "",
    image: require("../assets/lunch.jpg"),
  },
  {
    key: "Slide 2",
    image: require("../assets/color_food.jpg"),
  },
  {
    key: "Slide 3",
    image: require("../assets/food.jpg"),
  },
  {
    key: "Slide 4",
    image: require("../assets/landing_image.jpg"),
  },
  {
    key: "Slide 5",
    image: require("../assets/people_lunch.jpg"),
  },
];

// const Item = typeof slides[0];

function CarouselScreen() {
  const _renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.imageBackground}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        // keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        bottomButton={false}
        showSkipButton
        showPrevButton
        data={slides}
        skipLabel="Passer"
        nextLabel="Suivant"
        prevLabel="Précédent"
        doneLabel="Terminer"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
    marginVertical: 32,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F9B34C",
    margin: 10,
    width: 250,
    borderRadius: 20,
  },
  logo: {
    width: 160,
    height: 160,
  },
});

export default CarouselScreen;
