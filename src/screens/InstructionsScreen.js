import { SafeAreaView, Text, View, StyleSheet } from "react-native";

const InstructionsScreen = (navigation) => (
  <SafeAreaView style={styles.container}>
    <Text>Instructions go here!</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default InstructionsScreen;
