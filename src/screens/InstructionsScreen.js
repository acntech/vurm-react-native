import { SafeAreaView, Text, StyleSheet } from "react-native";
import instructions from "../../resources/instructions.json";
import { GAME_TITLE } from "../constants";

const InstructionsScreen = () => (
  <SafeAreaView style={styles.container} testID={"Instructions"}>
    <Text style={styles.header}>{GAME_TITLE}</Text>
    <Text style={styles.body}>{instructions.body}</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    textAlignVertical: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 26,
  },
  body: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default InstructionsScreen;
