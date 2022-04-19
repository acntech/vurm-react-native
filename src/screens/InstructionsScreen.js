import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import instructions from "../../resources/instructions.json";
import { title } from "../constants";
const InstructionsScreen = (navigation) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>{title}</Text>
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
