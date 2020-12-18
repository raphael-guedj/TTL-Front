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

// Intégration d'un carousel de présentation pour via l'import AppIntroSlider, composant react native.
// Ajout des informations (titre, image, etc.) dans une variable "slides" afin de pouvoir les utiliser dans la fonction CarouselScreen.
// Ajout de la balise safeAreaView pour éviter que l'encoche du téléphone ne cache une partie de l'écran.

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

function CarouselScreen({ navigation }) {
  const _renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.imageBackground}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text>Suivant</Text>
      </View>
    );
  };

  _renderPrevButton = () => {
    return (
      <View style={styles.button}>
        <Text>Précédent</Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.skip}>
        <Text>Terminer</Text>
      </View>
    );
  };

  _renderSkipButton = () => {
    return (
      <View style={styles.skip}>
        <Text>Passer</Text>
      </View>
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
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPrevButton}
        renderDoneButton={_renderDoneButton}
        renderSkipButton={_renderSkipButton}
        onDone={() => {
          navigation.navigate("Dejeunez");
        }}
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
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    backgroundColor: "#418581",
    margin: 10,
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
});

export default CarouselScreen;
