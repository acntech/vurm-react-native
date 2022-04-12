import { SafeAreaView, Text, StyleSheet } from "react-native";

const GameScreen = (navigation) => (
  <SafeAreaView style={styles.container}>
    <Text>Game goes here!</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default GameScreen;
