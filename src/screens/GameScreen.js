import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Game from "../components/Game";

const GameScreen = ({ route, navigation }) => (
  <SafeAreaView style={styles.container}>
    <Game></Game>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    // justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    alignContent: "center",
  },
  item: {
    backgroundColor: "#aaa",
    padding: 6,
    flex: 1,
    alignSelf: "center",
    // marginVertical: 0.5,
    // marginHorizontal: 0.5,
  },
  snakeBody: { backgroundColor: "#fed" },
});

export default GameScreen;
